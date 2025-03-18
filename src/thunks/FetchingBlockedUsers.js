import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const FetchingBlockedUsers = createAsyncThunk('/blocked-users', async ({page, limit, search}, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/user/blocked-users', {
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