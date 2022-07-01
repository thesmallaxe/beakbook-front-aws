import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ["barn_detail"],
});

const store = configureStore({
  reducer: RootReducer,
  middleware: [immutableInvariantMiddleware, thunk],
});

export default store;
