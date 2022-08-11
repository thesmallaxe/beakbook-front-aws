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

export const fetchDeviceRequest = createAsyncThunk(
  "device/data",
  async (data = {}) => {
    let url = DEVICE_END_POINT + `?companyId=${data.company_id}`;
    url += data.text !== null ? `&searchText=${data.text}` : "";
    url += data.page !== null ? `&page=${data.page}` : "&page=1";
    return await axios.get(url);
  }
);

const DashboardData = createSlice({
  name: "device_data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeviceRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchDeviceRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload.data;
      state.all_devices = action.payload.data.data;
      state.search.current_page = action.payload.data.meta.current_page;
    });

    builder.addCase(fetchDeviceRequest.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default DashboardData.reducer;
