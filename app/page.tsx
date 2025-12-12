'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchProducts, selectFilteredProducts } from '@/lib/redux/slices/productsSlice';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/products/SearchBar';
import { FilterControls } from '@/components/products/FilterControls';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';
import { Hero } from '@/components/hero/Hero';
export default function Home() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);
  const filteredProducts = useAppSelector(selectFilteredProducts);  // Use selector

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className="min-h-screen p-8">
      <Header />
      <Hero />
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <SearchBar />
        <FilterControls />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-500 dark:text-red-400 text-lg mb-2">
            Failed to load products
          </div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State - No Results */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            No products found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </main>
  );
}