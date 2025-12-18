// Base function to make GraphQL requests to Shopify

import { Product, Collection } from "@/types/shopify";

console.log('ENV CHECK:', {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    tokenExists: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    tokenLength: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length
});
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
    
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`;
  console.log("Shopify Store Domain:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
  console.log("Shopify Token exists:", !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  console.log("Shopify Token length:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error(errors[0]?.message || 'GraphQL query failed');
    }

    return data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    first: 20, // Get first 20 products
  };

  const response = await shopifyFetch<{
    products: {
      edges: Array<{
        node: Product; 
      }>;
    };
  }>({ query, variables });

  
  return response.products.edges.map(edge => edge.node);
}

// Get a single product by its handle (URL-friendly ID)
export async function getProduct(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  const variables = { handle };

  const response = await shopifyFetch<{
    product: any;
  }>({ query, variables });

  return response.product;
}
export async function getProductById(id: string): Promise<Product | null> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query,
          variables: { id },
        }),
      }
    );

    const { data } = await response.json();
    return data?.product || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}
export async function getCollections() {
  const query = `
    query getCollections {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({ query }),
      }
    );

    const { data } = await response.json();
    return data.collections.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getProductsByCollection(collectionHandle: string) {
  console.log('🔍 Fetching collection:', collectionHandle);
  
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        description
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query,
          variables: { handle: collectionHandle },
        }),
      }
    );

    const result = await response.json();
    console.log('📦 API Response:', JSON.stringify(result, null, 2));
    
    if (!result.data?.collection) {
      console.log('❌ No collection found');
      return null;
    }

    const returnData = {
      collection: {
        id: result.data.collection.id,
        title: result.data.collection.title,
        description: result.data.collection.description,
      },
      products: result.data.collection.products.edges.map((edge: any) => edge.node),
    };
    
    console.log('✅ Returning:', returnData.products.length, 'products');
    return returnData;
  } catch (error) {
    console.error('💥 Error fetching products by collection:', error);
    return null;
  }
}