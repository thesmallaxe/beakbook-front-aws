import { withPermission } from "../../../../app/hooks/with-permission";

const DeviceSearchInput = (props) => {
  return (
    <form className="devices__search-form">
      <i className="icon icon-search"></i>
      <input
        className="devices__search-input"
        type="search"
        placeholder="Search Devices"
        onInput={props.handleChange}
      />
    </form>
  );
};

export default withPermission(DeviceSearchInput, "search-device");
