import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  updateDeviceRequest,
  hideModal,
} from "../../../../app/slices/DeviceUpdateSlice";
import { withPermission } from "../../../../app/hooks/with-permission";

const EditDeviceModel = () => {
  const dispatch = useDispatch();
  const { loading, show, device } = useSelector(
    (state) => state.devices.update_device
  );
  const { data } = useSelector((state) => state.data.farm_data);
  const { meta } = useSelector((state) => state.devices.listing.results);
  const showModel = show ? "modal--show" : "";
  const [deviceData, setDeviceData] = useState(device);

  const handleInput = (prop) => (e) => {
    let update = { [prop]: e.target.value };

    if (prop === "farm_id" && Object.keys(data).length > 0) {
      let farm_id = parseInt(e.target.value);

      let farm = data.find((item) => {
        return item.id === farm_id;
      });
      update = { ...update, farm: farm, barn: {} };
    }

    if (prop === "barn_id" && deviceData?.farm?.barns) {
      let barn_id = parseInt(e.target.value);

      let barn = deviceData?.farm?.barns.find((item) => {
        return item.id === barn_id;
      });

      update = { ...update, barn: barn };
    }

    setDeviceData({ ...deviceData, ...update });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateDeviceRequest(deviceData));
  };

  useEffect(() => {
    let update = device;

    update = { ...update, page: meta?.current_page };

    if (device.farm_id !== null && Object.keys(data).length > 0) {
      let farm_id = parseInt(device.farm_id);

      let farm = data.find((item) => {
        return item.id === farm_id;
      });
      update = { ...update, farm: farm, barn: {} };
    }

    if (device.barn_id !== null && update?.farm?.barns) {
      let barn_id = parseInt(device.barn_id);

      let barn = update?.farm?.barns.find((item) => {
        return item.id === barn_id;
      });

      update = { ...update, barn: barn };
    }

    setDeviceData(update);
  }, [device, data, meta]);

  return (
    <div className={"modal " + showModel} id="UpdateDevice">
      <div className="modal__content">
        <form className="modal__body" onSubmit={handleSubmit}>
          <h1 className="modal__body__title">
            Edit a <span>Device</span>
          </h1>
          <p className="modal__body__description">
            The scale should be <u>connected</u> to the internet during edit.
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
                value={deviceData?.serial_number}
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
                value={deviceData?.aws_region}
                fullWidth
              />
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__field">
              <select
                onChange={handleInput("status")}
                value={deviceData.status}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Status</option>
                <option value="tested">Tested</option>
                <option value="not_tested">Not Tested</option>
              </select>
            </div>
            <div className="modal__body__field">
              <select
                onChange={handleInput("farm_id")}
                value={deviceData.farm_id}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Farm Name</option>
                {Object.keys(data).length > 0 &&
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
                value={deviceData.barn_id}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Barn Name</option>
                {deviceData?.farm?.barns &&
                  deviceData?.farm?.barns.map((item) => {
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
                value={deviceData.section_id}
                style={{ width: "100%", borderRadius: "5px" }}
                required
              >
                <option value="">Section</option>
                {deviceData?.barn?.section &&
                  deviceData?.barn?.section.map((item) => {
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
              Update Device
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

export default withPermission(EditDeviceModel, "edit-device");
