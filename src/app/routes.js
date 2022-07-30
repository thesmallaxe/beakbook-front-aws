import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Alerts,
  Barns,
  BarnsDetail,
  Dashboard,
  Devices,
  ForgotPassword,
  Login,
  NotFound,
  ResetPassword,
  Settings,
} from "../views/pages";
import { BaseLayout } from "../views/layouts/BaseLayout";
import { AuthLayout } from "../views/layouts/AuthLayout";
import Logout from "../views/components/partials/Logout";
import { AnimatePresence } from "framer-motion";
import { checkPermission } from "./hooks/with-permission";

export const LocalRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route exact path="/login" element={<Login />}></Route>
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          ></Route>
        </Route>
        {/* Dashboard Routes */}
        <Route element={<BaseLayout />}>
          <Route index exact path="/" element={<Dashboard />}></Route>
          {checkPermission("view-barn") && (
            <Route exact path="/barns" element={<Barns />}></Route>
          )}

          <Route
            exact
            path="/barns/:barn_id/cycle/:cycle_id"
            element={<BarnsDetail />}
          ></Route>
          {checkPermission("view-devices") && (
            <Route exact path="/devices" element={<Devices />}></Route>
          )}
          {checkPermission("receive-notifications") && (
            <Route exact path="/alerts" element={<Alerts />}></Route>
          )}
          {(checkPermission("change-password") ||
            checkPermission("send-feedback")) && (
            <Route exact path="/settings" element={<Settings />}></Route>
          )}
        </Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </AnimatePresence>
  );
};
