import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyError } from "../services/ToastHelper";
import axios from "../hooks/axios";

const FARM_LIST_END_POINT = "getFarmDetails";

const initialState = {
  loading: false,
  error: "",
  message: "",
  data: {},
};

export const getFarmListRequest = createAsyncThunk("farm/list", async () => {
  try {
    const response = await axios.get(FARM_LIST_END_POINT);
    return response.data;
  } catch (error) {
    notifyError(error);
    return error;
  }
});

const FarmDataList = createSlice({
  name: "farm_data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFarmListRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFarmListRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    });

    builder.addCase(getFarmListRequest.rejected, (state, action) => {
      console.log("rejected", action);
      state.loading = false;
      state.error = action.error?.message;
    });
  },
});

export const { initSortOrderl } = FarmDataList.actions;

export default FarmDataList.reducer;
