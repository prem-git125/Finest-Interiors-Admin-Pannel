import { createSlice } from "@reduxjs/toolkit";
import { userBlock } from "../thunks/userBlock";
import { userUnblock } from "../thunks/userUnblock";

const userBlockUnblockSlice = createSlice({
    name: 'userBlockUnblock',
    initialState: {
        users: [], // or any initial state you want
        loading: false,
        error: null,
        message: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(userBlock.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            
            .addCase(userBlock.fulfilled, (state,action) => {
                state.loading = false;
                state.message = action.payload.message;
            })

            .addCase(userBlock.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
              
            })

            .addCase(userUnblock.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(userUnblock.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
              })
              .addCase(userUnblock.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
    }
})

export default userBlockUnblockSlice.reducer;