'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { toast } from 'sonner';
import { WishlistButton } from '@/app/api/wishlist/WishlistButton';
import type { Product } from '@/types/shopify';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const image = product.images?.edges?.[0]?.node || product.featuredImage;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: price,
      quantity: 1,
      image: image?.url || '',
      imageAlt: image?.altText || product.title,
    }));
    
    toast.success('Added to cart', {
      description: product.title,
    });

    
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Link href={`/products/${product.handle}`}>
      <Card hover className="p-4 flex flex-col h-full">
      <div className="relative top-2 right-2 z-10">
        <WishlistButton productId={product.id} size="md" />
        </div>
        {image && (
          <div className="relative aspect-square w-full mb-4 bg-white rounded overflow-hidden">
            <img 
              src={image.url} 
              alt={image.altText || product.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {product.title}
          </h3>
          
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)} {currency}
          </p>
        </div>

        <Button 
          variant="primary" 
          size="md" 
          className="mt-4 w-full"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </Card>
    </Link>
  );
}