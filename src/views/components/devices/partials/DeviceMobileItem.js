import { useDispatch } from "react-redux";
import { checkPermission } from "../../../../app/hooks/with-permission";
import { showModal } from "../../../../app/slices/DeviceUpdateSlice";

export const DeviceMobileItem = ({ device }) => {
  const dispatch = useDispatch();
  const deviceEditPermission = checkPermission("edit-device");

  const handleClick = () => {
    dispatch(showModal(device));
  };

  return (
    <div className="barns__item">
      <div className="barns__item__content">
        <div className="barns__head__left">
          <div className="barns__head__item">
            <label>Serial Number</label>
            <p>
              <strong>#{device.serial_number}</strong>
            </p>
          </div>
          <div className="barns__head__item">
            <label>Location</label>
            <p>{device.location}</p>
          </div>
          <div className="barns__head__item">
            <label>Uptime</label>
            <p>22h 12m 32min</p>
          </div>
        </div>
        <div className="barns__head__right">
          <div className="barns__head__item">
            <label>Status</label>
            <p>
              {device.is_connected === 1 ? "Connected" : "Disconnected"}
              <span
                className={
                  "barns__head__item__status " +
                  (device.is_connected === 1 ? "active" : "deactive")
                }
              ></span>
            </p>
          </div>
        </div>
      </div>
      <div className="barns__item__content">
        <div className="barns__head__left">
          {deviceEditPermission && (
            <button onClick={handleClick} className="btn btn--link">
              Edit device information
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
