import React from "react";
import { MenuItem } from "./MenuItem";

export class Menu extends React.Component {
  render() {
    return (
      <ul className="sidebar__items">
        <MenuItem className="icon-dashboard" to="/" active="true">
          Dashboard
        </MenuItem>
        <MenuItem className="icon-barns" to="/barns">
          Barns
        </MenuItem>
        <MenuItem className="icon-devices" to="/devices">
          Devices
        </MenuItem>
        <MenuItem className="icon-alerts" to="/alerts">
          Alerts
        </MenuItem>
        <MenuItem className="icon-settings" to="/settings">
          Settings
        </MenuItem>
        {window.innerWidth < 768 && (
          <MenuItem className="icon-logout" to="/logout">
            Logout
          </MenuItem>
        )}
      </ul>
    );
  }
}
