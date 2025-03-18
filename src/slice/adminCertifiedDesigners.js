import { createSlice } from "@reduxjs/toolkit";
import { adminCertifiedDesigners } from "../thunks/adminCertifiedDesigners";

const initialState = {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 0,
    status: 'idle'
};

const adminCertifiedDesignersSlice = createSlice({
    name: 'adminCertifiedDesigners',
    initialState: initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminCertifiedDesigners.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminCertifiedDesigners.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(adminCertifiedDesigners.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const { setPage, setSearch } = adminCertifiedDesignersSlice.actions;
export default adminCertifiedDesignersSlice.reducer;
