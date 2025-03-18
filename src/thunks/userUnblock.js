import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const userUnblock = createAsyncThunk('/unblock-user', async (id,thunkAPI) => {
    try {
        const response = await api.$post(`http://localhost:7000/user/unblock-user/${id}`);
        console.log('API response ->', response.data)

        if(response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data)
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})