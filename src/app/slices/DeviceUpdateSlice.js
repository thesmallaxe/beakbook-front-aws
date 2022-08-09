import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createToast, toastSuccess, toastError } from "../services/ToastHelper";
import axios from "../hooks/axios";
import { searchDevices } from "../actions/DeviceActions";

const UPDATE_END_POINT = "update/device";

const initialState = {
  loading: false,
  error: "",
  message: "",
  device: {},
  show: false,
};

export const updateDeviceRequest = createAsyncThunk(
  "device/update",
  (update_data, thunkApi) => {
    const id = createToast();

    axios
      .post(UPDATE_END_POINT, update_data)
      .then((response) => {
        toastSuccess(id, response.data);

        thunkApi.dispatch(
          searchDevices(update_data.company_id, null, update_data.page)
        );

        return response.data;
      })
      .catch((error) => {
        toastError(id, error);
        return error;
      });
  }
);

const DeviceUpdateSlice = createSlice({
  name: "update_device",
  initialState,
  reducers: {
    initDevice: (state, action) => {
      state.order = action.payload?.pluginOrders?.plugin_order;
    },
    showModal: (state, action) => {
      state.show = true;
      state.device = action.payload;
    },
    hideModal: (state) => {
      state.show = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateDeviceRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateDeviceRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = action.payload?.message;
      state.show = false;
    });

    builder.addCase(updateDeviceRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message;
      state.message = "";
    });
  },
});

export const { initSortOrder, showModal, hideModal } =
  DeviceUpdateSlice.actions;

export default DeviceUpdateSlice.reducer;
