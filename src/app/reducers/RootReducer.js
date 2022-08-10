import { combineReducers } from "redux";

import DashboardReducer from "../slices/DashboardDataSlice";
import BarnReducer from "./BarnReducer";
import BarnDetailReducer from "./BarnDetailReducer";
import UserReducer from "./UserReducer";
// import DeviceReducer from "./DeviceReducer";
import SettingReducer from "./SettingReducer";
import CycleReducer from "./CycleReducer";
import PermssionReducer from "../slices/PermssionSlice";
import BarnOrderReducer from "../slices/BarnOrderSlice";
import DeviceReducer from "../slices/DeviceSlice";
import DeviceAddReducer from "../slices/DeviceAddSlice";
import DeviceUpdateReducer from "../slices/DeviceUpdateSlice";
import FarmDataListReducer from "../slices/FarmDataListSlice";

const RootReducer = combineReducers({
  auth: UserReducer,
  data: combineReducers({
    farm_data: FarmDataListReducer,
  }),
  user_permissions: PermssionReducer,
  dashboard: DashboardReducer,
  devices: combineReducers({
    listing: DeviceReducer,
    add_device: DeviceAddReducer,
    update_device: DeviceUpdateReducer,
  }),
  barns: BarnReducer,
  barn_detail: BarnDetailReducer,
  barn_order: BarnOrderReducer,
  cycle: CycleReducer,
  setting: SettingReducer,
});

export default RootReducer;
