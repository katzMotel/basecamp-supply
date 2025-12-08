

import { getProducts } from "@/lib/shopify/client";
export default async function Home() {
  const products = await getProducts();
  return (
    <main className='p-8'>
      <h1 className="text-4xl font-bold mb-8">CommerceHub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600 mt-2">
            ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
            </p>
            {product.images.edges[0] && (
              <img
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText}
                className="mt-4 w-full h-48 object-cover rounded"
              ></img>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
