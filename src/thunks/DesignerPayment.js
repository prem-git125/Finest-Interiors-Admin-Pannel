import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const CreateOrder = createAsyncThunk('/create-order', async ({ designer_id, total_amount, job_sheet_apply_id }, thunkAPI) => {
    try {
        const response = await api.$post('http://localhost:7000/designer_payments/create-order', { designer_id, total_amount, job_sheet_apply_id })

        console.log('API Response -> ', response.data)

        if(response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data)
        }
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const VerifyPayment = createAsyncThunk('/verify-payment', async (paymentData, thunkAPI) => {
    try {
        const response = await api.$post('http://localhost:7000/designer_payments/verify-payment', paymentData)

        console.log('API Response -> ', response.data)

        if(response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data)
        }
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});