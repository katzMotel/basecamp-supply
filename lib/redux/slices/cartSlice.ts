import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/shopify";

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};


const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                // Item already in cart, increment quantity
                existingItem.quantity += 1;
            } else {
                // New item, add to cart with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }
            
            // Recalculate total
            state.total = calculateTotal(state.items);
        },
        
        removeFromCart: (state, action: PayloadAction<string>) => {
            // Filter out the item by id
            state.items = state.items.filter(item => item.id !== action.payload);
            state.total = calculateTotal(state.items);
        },
        
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            
            if (item) {
                item.quantity = action.payload.quantity;
                
                // Remove item if quantity is 0 or less
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
            
            state.total = calculateTotal(state.items);
        },
        
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;