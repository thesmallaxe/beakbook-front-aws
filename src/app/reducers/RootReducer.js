import { combineReducers } from "redux";

import DashboardReducer from "./DashboardReducer";
import BarnReducer from "./BarnReducer";
import BarnDetailReducer from "./BarnDetailReducer";
import UserReducer from "./UserReducer";
import DeviceReducer from "./DeviceReducer";
import SettingReducer from "./SettingReducer";
import CycleReducer from "./CycleReducer";

const RootReducer = combineReducers({
  auth: UserReducer,
  dashboard: DashboardReducer,
  devices: DeviceReducer,
  barns: BarnReducer,
  barn_detail: BarnDetailReducer,
  cycle: CycleReducer,
  setting: SettingReducer,
});

export default RootReducer;
