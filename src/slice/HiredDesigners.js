import { createSlice } from "@reduxjs/toolkit";
import { HiredDesigners } from "../thunks/HiredDesigners";

const initialState = {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 0,
};
 
const HiredDesignersSlice = createSlice({
    name: 'HiredDesigners',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        },
        setSearch(state, action) {
            state.search = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HiredDesigners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(HiredDesigners.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(HiredDesigners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage, setSearch } = HiredDesignersSlice.actions;
export default HiredDesignersSlice.reducer;