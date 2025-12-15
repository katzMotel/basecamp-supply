'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { toast } from 'sonner';
import { getProductById} from '@/lib/shopify/client';

interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

interface ProductData {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText: string | null;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Record<string, ProductData>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist');
        if (response.ok) {
          const items = await response.json();
          setWishlistItems(items);

          // Fetch product details for each wishlist item
          const productPromises = items.map((item: WishlistItem) =>
            getProductById(item.productId)
          );
          const productResults = await Promise.all(productPromises);

          const productsMap: Record<string, ProductData> = {};
          productResults.forEach((product) => {
            if (product) {
              productsMap[product.id] = product;
            }
          });
          setProducts(productsMap);
        }
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [session, status, router]);

  const handleAddToCart = (product: ProductData) => {
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;
  
    dispatch(
      addToCart({
        id: product.id,  // Product ID
        variantId: variant.id,  // Changed from 'variant'
        title: product.title,
        price: parseFloat(variant.priceV2.amount),
        quantity: 1,
        image: product.featuredImage?.url || '',
        imageAlt: product.featuredImage?.altText || null,  // Added
      })
    );
  
    toast.success('Added to cart');
  };
  

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
      </div>
    );
  }

  return (
    <main className="min-h-screen relative z-10 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding products you love!
            </p>
            <Link href="/">
              <Button variant="primary">Browse Products</Button>
            </Link>
          </div>
        )}

        {/* Wishlist Grid */}
        {wishlistItems.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const product = products[item.productId];
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="group relative bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Remove Button */}
                  <div className="absolute top-2 right-2 z-10">
                    <WishlistButton productId={product.id} size="md" />
                  </div>

                  <Link href={`/products/${product.handle}`}>
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {product.featuredImage?.url ? (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-xl font-bold text-green-700 dark:text-green-500">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <div className="p-4 pt-0">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}