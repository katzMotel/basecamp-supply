import { getProductsByCollection, getCollections } from '@/lib/shopify/client';
import { ProductCard } from '@/components/products/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import type { Collection, Product } from '@/types/shopify';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const collections: Collection[] = await getCollections();
  
  return collections.map((collection) => ({
    handle: collection.handle,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const data = await getProductsByCollection(handle);

  if (!data || !data.products || data.products.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen relative z-10 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-700 dark:hover:text-green-500 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium">
            {data.collection.title}
          </span>
        </nav>

        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Products
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">{data.collection.title}</h1>
          {data.collection.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
              {data.collection.description}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data.products.length} {data.products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Back to Top Button (for long lists) */}
        {data.products.length > 12 && (
          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}