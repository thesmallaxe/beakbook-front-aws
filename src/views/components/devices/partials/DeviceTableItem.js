import React from "react";
import { useDispatch } from "react-redux";
import { checkPermission } from "../../../../app/hooks/with-permission";
import { showModal } from "../../../../app/slices/DeviceUpdateSlice";

export const DeviceTableItem = ({ device }) => {
  const dispatch = useDispatch();
  const deviceEditPermission = checkPermission("edit-device");

  const handleClick = () => {
    dispatch(showModal(device));
  };
  return (
    <tr>
      <td>
        <span>
          <i className="icon icon-devices"></i> #{device.serial_number}
        </span>
      </td>
      <td>
        <span
          className={
            "devices__table__connectivity " +
            (device.is_connected === 1 ? "connected" : "disconnected")
          }
        ></span>
        {device.is_connected === 1 ? "Connected" : "Disconnected"}
      </td>
      <td>{device.location}</td>
      <td>{device.uptime == null ? "" : "22h 12m 32 min"}</td>
      <td>
        <button className="devices__table__options-icon">
          <i className="icon icon-kebab"></i>
        </button>
        {deviceEditPermission && (
          <div className="devices__table__options">
            <a href="#edit-device" onClick={handleClick}>
              Edit Device
            </a>
          </div>
        )}
      </td>
    </tr>
  );
};
