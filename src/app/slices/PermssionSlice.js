import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: sessionStorage.getItem("permissions")
    ? JSON.parse(sessionStorage.getItem("permissions"))
    : [],
};

const PermissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    initPermissions: (state, action) => {
      state.permissions = action.payload.permissions;
    },
  },
});

export const { initPermissions } = PermissionSlice.actions;

export default PermissionSlice.reducer;
