import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  notifyError,
  notifySuccess,
} from "../services/ToastHelper";
import axios from "../axios";

const initialState = {
  loading: false,
  error: "",
  message: "",
  order: {},
};

export const updateBarnOrder = createAsyncThunk(
  "barn/update_order",
  (order_data) => {
    axios
      .post("add-plugin-order", order_data)
      .then((response) => {
        notifySuccess(response.data.message);
        return response.data;
      })
      .catch((error) => {
        notifyError(error);
        return error;
      });
  }
);

const BarnOrderSlice = createSlice({
  name: "barn_order",
  initialState,
  reducers: {
    initSortOrder: (state, action) => {
      state.order = action.payload?.pluginOrders?.plugin_order;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateBarnOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateBarnOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload?.plugin_order ?? state.order;
      state.error = "";
      state.message = action.payload?.message;
    });

    builder.addCase(updateBarnOrder.rejected, (state, action) => {
      state.loading = false;
      state.order = {};
      state.error = action.error?.message;
      state.message = "";
    });
  },
});

export const { initSortOrder } = BarnOrderSlice.actions;

export default BarnOrderSlice.reducer;
