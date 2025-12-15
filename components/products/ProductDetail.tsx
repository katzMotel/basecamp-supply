'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/slices/cartSlice';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { ReviewForm } from '../reviews/ReviewForm';
import { ReviewList } from '../reviews/ReviewList';
import type { ProductWithVariants } from '@/types/shopify';

interface ProductDetailProps {
  product: ProductWithVariants;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const images = product.images.edges.map(edge => edge.node);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);
  const handleAddToCart = async () => {
    setIsAdding(true);
    
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: price,
      quantity: 1,
      image: images[0]?.url || '',
      imageAlt: images[0]?.altText || product.title,
    }));
    
    toast.success('Added to cart', {
      description: product.title,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="aspect-square w-full bg-white rounded-lg overflow-hidden mb-4">
            <img
              src={images[selectedImage]?.url || ''}
              alt={images[selectedImage]?.altText || product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors
                    ${selectedImage === index 
                      ? 'border-blue-600' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                    }
                  `}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {product.title}
          </h1>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            ${price.toFixed(2)} {currency}
          </p>

          {/* Description */}
          <div className="prose prose-gray dark:prose-invert mb-8">
            <p>{product.description}</p>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full md:w-auto"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {product.variants.edges.length} variant(s) available
            </p>
          </div>
        </div>
        {/* Reviews Section */}
<section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
  <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
  
  <div className="grid lg:grid-cols-3 gap-8">  {/* CHANGED */}
    {/* Review Form - Takes 2 columns */}
    <div className="lg:col-span-2">  {/* ADDED */}
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <ReviewForm 
        productId={product.id}
        onReviewSubmitted={() => setReviewRefreshTrigger(prev => prev + 1)}
      />
    </div>  {/* ADDED */}

    {/* Review List - Takes 1 column */}
    <div className="lg:col-span-1">  {/* ADDED */}
      <h3 className="text-xl font-semibold mb-4">All Reviews</h3>
      <ReviewList 
        productId={product.id}
        refreshTrigger={reviewRefreshTrigger}
      />
    </div>  {/* ADDED */}
  </div>
</section>
      </div>
    </div>
  );
}