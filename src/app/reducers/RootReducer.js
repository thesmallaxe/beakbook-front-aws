import { combineReducers } from "redux";

import DashboardReducer from "./DashboardReducer";
import BarnReducer from "./BarnReducer";
import BarnDetailReducer from "./BarnDetailReducer";
import UserReducer from "./UserReducer";
import DeviceReducer from "./DeviceReducer";
import SettingReducer from "./SettingReducer";
import CycleReducer from "./CycleReducer";
import PermssionReducer from "../slices/PermssionSlice";
import BarnOrderReducer from "../slices/BarnOrderSlice";

const RootReducer = combineReducers({
  auth: UserReducer,
  user_permissions: PermssionReducer,
  dashboard: DashboardReducer,
  devices: DeviceReducer,
  barns: BarnReducer,
  barn_detail: BarnDetailReducer,
  barn_order: BarnOrderReducer,
  cycle: CycleReducer,
  setting: SettingReducer,
});

export default RootReducer;
