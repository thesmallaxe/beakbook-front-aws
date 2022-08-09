import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createToast, toastSuccess, toastError } from "../services/ToastHelper";
import axios from "../hooks/axios";
import { searchDevices } from "../actions/DeviceActions";

const CREATE_END_POINT = "create/device";

const initialState = {
  loading: false,
  error: "",
  message: "",
  device: {},
  show: false,
};

export const addDeviceRequest = createAsyncThunk(
  "device/add",
  (add_data, thunkApi) => {
    const id = createToast();

    axios
      .post(CREATE_END_POINT, add_data)
      .then((response) => {
        toastSuccess(id, response.data);

        thunkApi.dispatch(
          searchDevices(add_data.company_id, null, add_data.page)
        );

        return response.data;
      })
      .catch((error) => {
        toastError(id, error);
        return error;
      });
  }
);

const DeviceAddSlice = createSlice({
  name: "add_device",
  initialState,
  reducers: {
    initDevice: (state, action) => {
      state.device = action.payload?.device;
    },
    showModal: (state) => {
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addDeviceRequest.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addDeviceRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.show = false;
      state.message = action.payload?.message;
    });

    builder.addCase(addDeviceRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message;
      state.message = "";
      state.show = true;
    });
  },
});

export const { initSortOrder, showModal, hideModal } = DeviceAddSlice.actions;

export default DeviceAddSlice.reducer;
