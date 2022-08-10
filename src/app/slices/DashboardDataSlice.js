import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../hooks/axios";

const DASHBOARD_END_POINT = "dashboard/favourites";

const initialState = {
  loading: false,
  favourite_barns: {},
  stats: {},
};

export const getDashboardDataRequest = createAsyncThunk(
  "dashboard/data",
  async () => await axios.get(DASHBOARD_END_POINT)
);

const DashboardData = createSlice({
  name: "dashboard_data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardDataRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDashboardDataRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.favourite_barns = action.payload.data.barnOverview;
      state.stats = action.payload.data.otherStatistics?.statistics?.allBarns;
    });

    builder.addCase(getDashboardDataRequest.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default DashboardData.reducer;
