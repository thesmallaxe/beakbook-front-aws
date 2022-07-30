import React from "react";
import { checkPermission } from "../../../app/hooks/with-permission";
import { MenuItem } from "./MenuItem";

export class Menu extends React.Component {
  render() {
    return (
      <ul className="sidebar__items">
        <MenuItem className="icon-dashboard" to="/" active="true">
          Dashboard
        </MenuItem>
        {checkPermission("view-barn") && (
          <MenuItem className="icon-barns" to="/barns">
            Barns
          </MenuItem>
        )}
        {checkPermission("view-devices") && (
          <MenuItem className="icon-devices" to="/devices">
            Devices
          </MenuItem>
        )}
        {checkPermission("receive-notifications") && (
          <MenuItem className="icon-alerts" to="/alerts">
            Alerts
          </MenuItem>
        )}
        {(checkPermission("change-password") ||
          checkPermission("send-feedback")) && (
          <MenuItem className="icon-settings" to="/settings">
            Settings
          </MenuItem>
        )}

        {window.innerWidth < 768 && (
          <MenuItem className="icon-logout" to="/logout">
            Logout
          </MenuItem>
        )}
      </ul>
    );
  }
}
