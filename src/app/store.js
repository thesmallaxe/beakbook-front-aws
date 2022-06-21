import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";

const store = configureStore(
  {
    reducer: RootReducer,
  },
  applyMiddleware(thunk)
);

export default store;
