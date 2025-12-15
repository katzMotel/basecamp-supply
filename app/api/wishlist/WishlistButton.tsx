'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface WishlistButtonProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function WishlistButton({ 
  productId, 
  size = 'md',
  showLabel = false 
}: WishlistButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Check if product is in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/wishlist');
        if (response.ok) {
          const wishlist = await response.json();
          const isInList = wishlist.some(
            (item: { productId: string }) => item.productId === productId
          );
          setIsInWishlist(isInList);
        }
      } catch (error) {
        console.error('Failed to check wishlist:', error);
      }
    };

    checkWishlist();
  }, [session, productId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is inside a link
    e.stopPropagation();

    if (status === 'loading') return;

    if (!session) {
      toast.error('Please sign in to save items');
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await fetch(
          `/api/wishlist/${encodeURIComponent(productId)}`,
          { method: 'DELETE' }
        );

        if (response.ok) {
          setIsInWishlist(false);
          toast.success('Removed from wishlist');
        } else {
          toast.error('Failed to remove from wishlist');
        }
      } else {
        // Add to wishlist
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });

        if (response.ok) {
          setIsInWishlist(true);
          toast.success('Added to wishlist');
        } else {
          const data = await response.json();
          toast.error(data.error || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        flex items-center gap-2 p-2 rounded-lg transition-all
        hover:bg-gray-100 dark:hover:bg-gray-800
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`${sizes[size]} transition-all ${
          isInWishlist
            ? 'fill-red-500 text-red-500'
            : 'fill-none text-gray-600 dark:text-gray-400'
        }`}
      />
      {showLabel && (
        <span className="text-sm font-medium">
          {isInWishlist ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}