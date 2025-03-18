import { createSlice } from "@reduxjs/toolkit";
import { adminDesignerApproval } from "../thunks/adminDesignerApproval";

const adminDesignerApprovalSlice = createSlice({
    name: "adminDesignerApproval",
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {
        resetApproval(state) {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminDesignerApproval.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(adminDesignerApproval.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(adminDesignerApproval.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
    }
})

export const { resetApproval } = adminDesignerApprovalSlice.actions
export const selectApprovalStatus = (state) => state.adminDesignerApproval
export default adminDesignerApprovalSlice.reducer
