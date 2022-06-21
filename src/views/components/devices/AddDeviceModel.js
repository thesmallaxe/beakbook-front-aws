import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AddDeviceModel = ({
  loading,
  show = false,
  cancelAction,
  handleCreateAction,
  success,
  error,
}) => {
  const showModel = show ? "devices__add-new__modal--show" : "";

  return (
    <div className={"devices__add-new__modal " + showModel}>
      <div className="devices__add-new__modal-content">
        <div className="devices__add-new__modal-body">
          <h1 className="devices__add-new__modal-body__title">
            Register a <span>new Device</span>
          </h1>
          <p className="devices__add-new__modal-body__sub-title">
            The scale should be <span>connected</span> to the internet during
            registration.
          </p>
          <p className="devices__add-new__modal-body__field-title">
            The <span>serial number</span> should be located on a sticker placed
            on the bottom of the scale.
          </p>
          <div className="devices__add-new__modal-body__field">
            <TextField label="Serial Number" variant="outlined" />
          </div>
          {/* <p className="devices__add-new__modal-body__field-subtitle">
            Add <span>tags</span> to identify the device more easily
          </p>
          <div className="devices__add-new__modal-body__field tags">
            <TextField label="Tags (optional)" variant="outlined" />
          </div> */}
          <div className="devices__add-new__modal-body__tags-wrapper">
            {/*  <div className="devices__add-new__modal-body__tag">
              <p>#prototype</p>
              <span className="close">&times;</span>
            </div>
            <div className="devices__add-new__modal-body__tag">
              <p>#test_tag</p>
              <span className="close">&times;</span>
            </div>
            <div className="devices__add-new__modal-body__tag">
              <p>#male</p>
              <span className="close">&times;</span>
            </div> */}
          </div>

          <div className="devices__add-new__modal-body__btn-wrapper">
            <Button variant="contained">Register device</Button>
            <Button variant="contained" onClick={() => cancelAction()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
