import React, { useState } from "react";
import { connect } from "react-redux";
import { createDevice, searchDevices } from "../../app/actions/DeviceActions";
import { ShimmerTable } from "react-shimmer-effects";
import { AddDeviceModel } from "../components/devices/AddDeviceModel";
import { DeviceTableItem } from "../components/devices/DeviceTableItem";
import Paginator from "../components/Paginator";

function Devices(props) {
  const {
    loading,
    success,
    error,
    user,
    user_farm,
    devices,
    pagination,
    searchDevices,
    addNewDevice,
  } = props;

  const [search, setSearch] = useState({ search: null, page: 1 });
  const [show, setShow] = useState(false);

  const handleShowDevice = (event) => {
    setShow(!show);
  };

  const handleChange = (event) => {
    setSearch({ ...search, search: event.target.value });
    searchDevices(user_farm.company_id, event.target.value);
  };

  const handlePagination = (search, page) => {
    searchDevices(user_farm.company_id, search, page);
  };

  return (
    <div className="container">
      <div className="devices">
        <h3 className="devices__welcome_title">
          Hello, <strong>{user?.name ?? "User"}</strong>
        </h3>
        <p className="devices__welcome_text">
          Here you can view all of your devices
        </p>
        <div className="devices__overview">
          <div className="devices__table-title-block">
            <h3 className="devices__table-title">Device Overview</h3>
            <form className="devices__search-form">
              <i className="icon icon-search"></i>
              <input
                className="devices__search-input"
                type="search"
                placeholder="Search Devices"
                onInput={handleChange}
              />
            </form>
          </div>
          <div className="devices__table-content">
            {Object.keys(devices).length === 0 && loading && (
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
          <Paginator
            path="devices"
            data={pagination}
            paginateAction={handlePagination}
            search={search.search}
          />
        </div>
        <button className="devices__add-new" onClick={handleShowDevice}>
          <i className="icon icon-add"></i>
        </button>
        <AddDeviceModel
          show={show}
          loading={loading}
          success={success}
          error={error}
          cancelAction={handleShowDevice}
          handleCreateAction={addNewDevice}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    user_farm: state.auth.farm_details,
    loading: state.devices.loading,
    download: state.devices.download,
    devices: state.devices.all_devices,
    pagination: state.devices.results.meta,
    search: state.devices.search,
    success: state.devices.success,
    error: state.devices.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchDevices: (arg, arg2, arg3) =>
      dispatch(searchDevices(arg, arg2, arg3)),
    addNewDevice: (obj) => dispatch(createDevice(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
