import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  addDeviceRequest,
  hideModal,
} from "../../../../app/slices/DeviceAddSlice";
import { withPermission } from "../../../../app/hooks/with-permission";

const AddDeviceModel = () => {
  const dispatch = useDispatch();
  const { loading, show } = useSelector((state) => state.devices.add_device);
  const { meta } = useSelector((state) => state.devices.listing.results);
  const { data } = useSelector((state) => state.data.farm_data);
  const { user } = useSelector((state) => state.auth);
  const showModel = show ? "modal--show" : "";
  const [device, setDevice] = useState({
    company_id: user.company_id,
  });

  const handleInput = (prop) => (e) => {
    let update = { [prop]: e.target.value };

    if (prop === "farm_id" && Object.keys(data).length > 0) {
      let farm_id = parseInt(e.target.value);

      let farm = data.find((item) => {
        return item.id === farm_id;
      });
      update = { ...update, farm: farm, barn: {} };
    }

    if (prop === "barn_id" && device?.farm?.barns) {
      let barn_id = parseInt(e.target.value);

      let barn = device?.farm?.barns.find((item) => {
        return item.id === barn_id;
      });

      update = { ...update, barn: barn };
    }
    setDevice({ ...device, ...update });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addDeviceRequest(device));
  };

  useEffect(
    (device) => {
      setDevice({
        ...device,
        page: meta?.current_page,
        company_id: user?.company_id,
        aws_region: "eu-west-2",
        status: "tested",
      });
    },
    [meta, user]
  );

  return (
    <div className={"modal " + showModel} id="AddDevice">
      <div className="modal__content">
        <form className="modal__body" onSubmit={handleSubmit}>
          <h1 className="modal__body__title">
            Register a <span>new Device</span>
          </h1>
          <p className="modal__body__description">
            The scale should be <u>connected</u> to the internet during
            registration.
          </p>
          <p className="modal__body__description">
            The <b>serial number</b> should be located on a sticker placed on
            the bottom of the scale.{" "}
          </p>
          <div className="modal__body__row">
            <div className="modal__body__field">
              <TextField
                label="Serial Number"
                variant="outlined"
                value={device?.serial_number ?? ""}
                onInput={handleInput("serial_number")}
                InputProps={{
                  readOnly: loading,
                }}
                fullWidth
                required
              />
            </div>
            <div className="modal__body__field">
              <TextField
                label="AWS Region"
                variant="outlined"
                onInput={handleInput("aws_region")}
                InputProps={{
                  readOnly: loading,
                }}
                value={device?.aws_region ?? ""}
                fullWidth
              />
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__field">
              <select
                onChange={handleInput("status")}
                value={device.status}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Status</option>
                <option value="tested">Tested</option>
                <option value="untested">Untested</option>
              </select>
            </div>
            <div className="modal__body__field">
              <select
                onChange={handleInput("farm_id")}
                value={device.farm_id ?? ""}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Farm Name</option>
                {Object.keys(data).length &&
                  data.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__field">
              <select
                onChange={handleInput("barn_id")}
                value={device.barn_id ?? ""}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Barn Name</option>
                {device?.farm?.barns &&
                  device?.farm?.barns.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="modal__body__field">
              <select
                onChange={handleInput("section_id")}
                value={device.section_id ?? ""}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Section</option>
                {device?.barn?.section &&
                  device?.barn?.section.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div className="modal__body__action_wrapper">
            <Button type="submit" variant="contained">
              Register Device
            </Button>
            <Button variant="contained" onClick={() => dispatch(hideModal())}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withPermission(AddDeviceModel, "add-device");
