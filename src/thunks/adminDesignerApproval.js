import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const adminDesignerApproval = createAsyncThunk('/designer-status-approval', async (id, thunkAPI) => {
    try {
        const response = await api.$put(`http://localhost:7000/user/designer-status-approval/${id}`)

        console.log('API Response -> ', response.data)

        if(response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(response.data)
    }
});