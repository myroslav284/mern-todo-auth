import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "/auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    console.log(data);
    return data;
  }
);

export const fetchSignup = createAsyncThunk(
  "/auth/fetchSignup",
  async (params) => {
    const { data } = await axios.post("/auth/signup", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchSignup.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchSignup.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
