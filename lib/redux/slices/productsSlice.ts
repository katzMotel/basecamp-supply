import type { Product } from "@/types/shopify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "@/lib/shopify/client";
interface ProductsState { 
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items:[],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const products = await getProducts();
        return products;
    } 
);

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading= true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products'
            });
    },
});

export default productsSlice.reducer;