import { createSlice } from "@reduxjs/toolkit";
import { CreateOrder, VerifyPayment } from "../thunks/DesignerPayment";

const DesignerPaymentSlice = createSlice({
    name: 'DesignerPayment',
    initialState: {
        orderId: null,
        loading: false,
        error: null,
        paymentSuccess: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CreateOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderId = action.payload;
            })
            .addCase(CreateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(VerifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(VerifyPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentSuccess = action.payload;
            })
            .addCase(VerifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default DesignerPaymentSlice.reducer