import { useState } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import DeviceContainer from "../components/devices/DeviceContainer";
import { fetchDeviceRequest } from "../../app/slices/DeviceSlice";

const Devices = (props) => {
  const { user, user_farm, searchDevices } = props;
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
    <div className="container--fluid">
      <Header />
      <div className="container">
        <div className="dashboard__welcome">
          <h3 className="dashboard__welcome_title">
            Hello, <strong>{user?.name ?? "User"}</strong>
          </h3>
          <div className="dashboard__welcome_block">
            <p className="dashboard__welcome_text">
              <span className="muted_text">
                Here you can view all of your devices
              </span>
            </p>
          </div>
        </div>
        <DeviceContainer
          {...props}
          search={search.search}
          show={show}
          handleShowDevice={handleShowDevice}
          handleChange={handleChange}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    user_farm: state.auth.farm_details,
    loading: state.devices.listing.loading,
    download: state.devices.listing.download,
    devices: state.devices.listing.all_devices,
    pagination: state.devices.listing.results.meta,
    search: state.devices.listing.search,
    success: state.devices.listing.success,
    error: state.devices.listing.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchDevices: (company_id, text, page) =>
      dispatch(fetchDeviceRequest({ company_id, text, page })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
