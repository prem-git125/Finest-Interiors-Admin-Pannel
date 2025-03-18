import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const MostAppliedDesignerChart = createAsyncThunk('/most-applied-designer-chart', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/mostly-applied-designer-charts')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }

        return response.data.designer
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error);
    }
})