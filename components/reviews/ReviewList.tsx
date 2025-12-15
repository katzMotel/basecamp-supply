'use client';

import { useEffect, useState } from 'react';
import { StarRating } from './StarRating';

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

interface ReviewListProps {
  productId: string;
  refreshTrigger?: number;
}

export function ReviewList({ productId, refreshTrigger = 0 }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/reviews/${encodeURIComponent(productId)}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Average Rating Summary */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {averageRating.toFixed(1)}
          </p>
          <StarRating rating={Math.round(averageRating)} readonly size="sm" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {review.user.name || review.user.email.split('@')[0]}
                </p>
                <StarRating rating={review.rating} readonly size="sm" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}