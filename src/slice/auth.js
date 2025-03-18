import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
