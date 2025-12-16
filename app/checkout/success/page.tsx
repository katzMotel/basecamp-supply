'use client';
import { clearCart } from "@/lib/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [orderSaved, setOrderSaved] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.total);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    // Only save order if we have a session ID, haven't saved yet, and have items
    if (sessionId && !orderSaved && cartItems.length > 0) {
      saveOrder(sessionId);
    } else if (orderSaved || !sessionId) {
      // Clear cart after order is saved or if no session ID
      dispatch(clearCart());
    }
  }, [searchParams, orderSaved, cartItems, dispatch]);

  const saveOrder = async (sessionId: string) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stripeSessionId: sessionId,
          total: cartTotal,
          items: cartItems,
        }),
      });

      if (response.ok) {
        setOrderSaved(true);
        // Clear cart after successfully saving order
        dispatch(clearCart());
      }
    } catch (error) {
      console.error('Failed to save order:', error);
      // Clear cart anyway to prevent re-attempts
      dispatch(clearCart());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10">
      <div className="max-w-md space-y-4 text-center p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please check your email for order details/shipping information.
          If you need to make changes to your order please contact support at{' '}
          <a
            href="mailto:customerservice@basecampsupply.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            customerservice@basecampsupply.com
          </a>
        </p>

        <div className="space-y-3 pt-4">
          <Link href="/orders">
            <Button variant="primary" size="lg" className="w-full">
              View Order History
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}