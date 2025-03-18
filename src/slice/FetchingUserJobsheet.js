import { createSlice } from "@reduxjs/toolkit";
import { FetchingUserJobsheet } from "../thunks/FetchingUserJobsheet";

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

const FetchingUserJobsheetSlice = createSlice({
    name: 'FetchingUserJobsheet',
    initialState: initialState,
    reducers: {
        setPage (state, action)  {
            state.page = action.payload;
        },

        setSearch (state, action)  {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchingUserJobsheet.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchingUserJobsheet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.data = action.payload.data;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(FetchingUserJobsheet.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const {setPage, setSearch} = FetchingUserJobsheetSlice.actions
export default FetchingUserJobsheetSlice.reducer