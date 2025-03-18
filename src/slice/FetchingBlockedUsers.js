import { createSlice } from "@reduxjs/toolkit";
import { FetchingBlockedUsers } from "../thunks/FetchingBlockedUsers";

const initialState = {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 0,
    // status: 'idle'
};

const FetchingBlockedUsersSlice = createSlice({
    name: 'FetchingBlockedUsers',
    initialState,
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
        .addCase(FetchingBlockedUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(FetchingBlockedUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(FetchingBlockedUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { setPage, setSearch } = FetchingBlockedUsersSlice.actions;

export default FetchingBlockedUsersSlice.reducer;