import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import type { CartItem } from "@/types/shopify";
export async function POST(request: Request) {
    
    try {
      // Get items from request body (sent by client)
      const { items }: { items: CartItem[] } = await request.json();
      
      // Transform each cart item into Stripe format
      const lineItems = items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert $ to cents
        },
        quantity: item.quantity,
      }));
      
      // Stripe calculates total automatically from lineItems
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/checkout/success`,
        cancel_url: `http://localhost:3000`,
      });
      
      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error('Stripe error:', error);
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }
  }