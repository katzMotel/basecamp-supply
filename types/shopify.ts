export interface Product {
    id: string;
    title: string;
    handle: string;
    description: string;
    priceRange: {
        minVariantPrice: {
            amount:string;
            currencyCode:string;
        };
    };
    images: {
        edges: Array<{
            node: {
                url: string;
                altText:string;
                width:number;
                height:number;
            };
        }>;
    };
    featuredImage?:{
        url: string;
        altText: string | null;
    }
}

export interface ProductWithVariants extends Product {
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
        };
      }>;
    };
}

export interface ProductDisplay {
    id: string;
    title: string;
    handle: string;
    description: string;
    price: number;
    currencyCode: string;
    image: string;
    imageAlt: string | null;
}

export interface CartItem {
    id: string;           
    variantId?: string;   
    title: string;
    price: number;
    quantity: number;
    image: string;
    imageAlt: string | null;
}

export interface Collection{
    id: string;
    title: string;
    handle: string;
    description?: string;
    image?:{
        url: string;
        altText: string | null;
    };
}

export type TransformProduct = (product: Product) => ProductDisplay;

