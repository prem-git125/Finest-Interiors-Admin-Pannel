import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const HiredDesigners = createAsyncThunk('/hired-designers', async ({page, limit, search}, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/user/hired-designers', {
            params: {page, limit, search}
        });

        console.log('API response ->', response.data)

        if(response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data)
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})