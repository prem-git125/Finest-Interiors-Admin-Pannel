import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const userdesignerCharts = createAsyncThunk('/user-designer-charts', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/user-designer-charts')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const topFiveDesigner = createAsyncThunk('/top-five-designers', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/top-five-designers')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }

        return response.data.designer;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }   
})