import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

export const JobsheetCounts = createAsyncThunk('/jobsheet-counts', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/total-jobsheets')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }
        return response.data.totalJobsheets
    } catch (error) {
        return thunkAPI.rejectWithValue(error);   
    }
});

export const CompletedJobsheetCounts = createAsyncThunk('/completed-jobsheet-counts', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/completed-jobsheets')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }
        return response.data.completedJobsheets
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const PendingJobsheetCounts = createAsyncThunk('/pending-jobsheet-counts', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/pending-jobsheets')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data); 
        }
        return response.data.pendingJobsheets
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const TotalRevenue = createAsyncThunk('/total-revenue', async (_, thunkAPI) => {
    try {
        const response = await api.$get('http://localhost:7000/charts/total-revenue')

        if (response.status !== 200) {
            return thunkAPI.rejectWithValue(response.data);
        }
        return response.data.totalRevenue[0].total
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});