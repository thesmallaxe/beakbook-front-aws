import React from "react";

export const DeviceTableItem = ({ device }) => {
  return (
    <tr>
      <td>
        <span>
          <i className="icon icon-devices"></i> #{device.serial_number}
        </span>
      </td>
      <td>
        <span className="devices__table__connectivity connected"></span>
        Connected
      </td>
      <td>{device.location}</td>
      <td>22h 12m 32 min</td>
      <td>
        <button className="devices__table__options-icon">
          <i className="icon icon-kebab"></i>
        </button>
        {/* <div className="devices__table__options">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
        </div> */}
      </td>
    </tr>
  );
};
