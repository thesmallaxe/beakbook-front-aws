import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../hooks/axios";

const DEVICE_END_POINT = "getDevices";

const initialState = {
  loading: false,
  error: {},
  success: {},
  all_devices: {},
  results: {},
  search: {
    search: null,
    current_page: 1,
    total_pages: 1,
  },
};

export const getDashboardDataRequest = createAsyncThunk(
  "dashboard/data",
  async (company_id = null, text = null, page = null) => {
    let url = DEVICE_END_POINT + `?companyId=${company_id}`;
    url += text !== null ? `&searchText=${text}` : "";
    url += page !== null ? `&page=${page}` : "&page=1";
    return await axios.get(url);
  }
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
      state.results = action.payload;
      state.stats = action.payload.data.otherStatistics?.statistics?.allBarns;
    });

    builder.addCase(getDashboardDataRequest.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default DashboardData.reducer;
