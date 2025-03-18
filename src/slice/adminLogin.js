import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../thunks/adminLogin";

const initialState = {
  loading: false,
  error: null,
  user: null,
  isLogin: false,
  id: "",
  token: null,
  status: false,
  firstName: null,
};

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    clearMsg: (state) => {
      state.message = null;
      state.error = null;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setName(state, action) {
      state.firstName = action.payload;
    },
    logout: (state) => {
        (state.isLogin = false),
        (state.loading = false),
        (state.error = null),
        (state.message = null),
        (state.user = null),
        (state.token = null),
        (state.status = false),
        (state.firstName = null);
        (state.id = '');
    }
  },

  extraReducers: (builder) => {
    builder
    .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.isLogin = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.name = action.payload.name
        state.id = action.payload.id
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload.message;
      });
  }
});

export const { clearMsg, setId, setStatus, setUser, setToken, setProfile, setName, logout } =
  adminLoginSlice.actions;
export default adminLoginSlice.reducer;
