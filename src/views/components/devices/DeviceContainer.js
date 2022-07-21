import {
  checkPermission,
  withPermission,
} from "../../../app/hooks/with-permission";
import { ShimmerTable } from "react-shimmer-effects";
import { AddDeviceModel } from "./popups/AddDeviceModel";
import { DeviceTableItem } from "./partials/DeviceTableItem";
import { DeviceMobileItem } from "./partials/DeviceMobileItem";
import Paginator from "../Paginator";
import DeviceSearchInput from "./partials/DeviceSearchInput";

const DeviceContainer = (props) => {
  const deviceAddPermission = checkPermission("add-device");
  const devices = props.devices;

  return (
    <div className="devices">
      <div className="devices__overview">
        <div className="devices__table-title-block">
          <h3 className="devices__table-title">Device Overview</h3>
          <DeviceSearchInput {...props} />
        </div>
        {window.innerWidth >= 768 ? (
          <div className="devices__table-content">
            {Object.keys(devices).length === 0 && props.loading && (
              <ShimmerTable row={5} col={5} />
            )}
            {Object.keys(devices).length !== 0 && (
              <table className="devices__table">
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Uptime</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {devices &&
                    Object.keys(devices).map((key) => {
                      return (
                        <DeviceTableItem key={key} device={devices[key]} />
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="barns__list">
            {devices &&
              Object.keys(devices).map((key) => {
                return <DeviceMobileItem key={key} device={devices[key]} />;
              })}
          </div>
        )}
        <Paginator
          path="devices"
          data={props.pagination}
          paginateAction={props.handlePagination}
          search={props.search}
        />
      </div>
      {deviceAddPermission && (
        <>
          <button className="barns__add-new" onClick={props.handleShowDevice}>
            <i className="icon icon-add"></i>
          </button>
          <AddDeviceModel
            show={props.show}
            loading={props.loading}
            success={props.success}
            error={props.error}
            cancelAction={props.handleShowDevice}
            handleCreateAction={props.addNewDevice}
          />
        </>
      )}
    </div>
  );
};

export default withPermission(DeviceContainer, "view-devices", true);
