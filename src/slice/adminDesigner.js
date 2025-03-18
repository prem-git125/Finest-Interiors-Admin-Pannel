import { createSlice } from "@reduxjs/toolkit";
import { adminDesigner } from "../thunks/adminDesigner"

const initialState = {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    loading: false,
    error: null,
    totalItems: 0,
    totalPages: 0,
    status: 'idle',
    error: null
};

const adminDesignerSlice = createSlice({
    name: 'adminDesigner',
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
        .addCase(adminDesigner.pending, (state) => {
            state.status = "loading";
            state.error = null; // Reset error on new request
          })
          .addCase(adminDesigner.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload.data;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
          })
          .addCase(adminDesigner.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message; // Store error message
          });
    }
});

export const selectAdminDesigner = (state) => state.adminDesignerSlice;
export const { setPage, setSearch } = adminDesignerSlice.actions;
export default adminDesignerSlice.reducer;