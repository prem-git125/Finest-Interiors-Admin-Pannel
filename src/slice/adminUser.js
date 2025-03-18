// slice/adminUser.js
import { createSlice } from "@reduxjs/toolkit";
import { adminUser } from "../thunks/adminUser";

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

const adminUserSlice = createSlice({
    name: 'adminUser',
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
            .addCase(adminUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(adminUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const { setPage, setSearch } = adminUserSlice.actions;
export default adminUserSlice.reducer;
