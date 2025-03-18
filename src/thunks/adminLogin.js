import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../api'

export const adminLogin = createAsyncThunk('/login', async ({ email,password }, thunkAPI) => {
    try {
        const response = await api.$post('http://localhost:7000/user/login', {email, password});

        console.log('API response =>' , response.data)

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }

        return response.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});