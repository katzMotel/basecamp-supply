// Base function to make GraphQL requests to Shopify

console.log('ENV CHECK:', {
    domain: process.env.SHOPIFY_STORE_DOMAIN,
    tokenExists: !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    tokenLength: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length
});
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
    
  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`;
  console.log("Shopify Store Domain:", process.env.SHOPIFY_STORE_DOMAIN);
  console.log("Shopify Token exists:", !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  console.log("Shopify Token length:", process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
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
export async function getProducts() {
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
        node: any; 
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