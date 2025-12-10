'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/lib/redux/slices/cartSlice';
import { Button } from '@/components/ui';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Drawer - slides in from right */}
      <div 
        className={`
          fixed right-0 top-0 h-full w-full max-w-md 
          bg-white dark:bg-[#1a1a1a] 
          z-50 shadow-xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#333333]">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg"
                >
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.imageAlt ?? ''}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ 
                          id: item.id, 
                          quantity: item.quantity - 1 
                        }))}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => dispatch(updateQuantity({ 
                          id: item.id, 
                          quantity: item.quantity + 1 
                        }))}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {/* Remove Item */}
                      <button
                      onClick={() => {
                        dispatch(removeFromCart(item.id));
                        toast.success('Removed from cart', {
                          description: item.title,
                        });
                      }}
                        className="ml-auto p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-[#333333] p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Button variant="primary" size="lg" className="w-full">
              Checkout
            </Button>

            {/* Clear Cart */}
            <button
            onClick={() => {
              dispatch(clearCart());
              toast.success('Cart cleared');
            }}
              className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}