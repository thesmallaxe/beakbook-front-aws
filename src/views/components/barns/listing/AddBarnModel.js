import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

export const AddBarnModel = ({
  farm_details,
  loading,
  show = false,
  cancelAction,
  handleCreateAction,
  success,
  error,
}) => {
  const showModel = show ? "barns__modal--show" : "";
  const [barn, setBarn] = useState({
    name: "",
    location: "",
    farm_id: farm_details?.id,
  });

  const handleInput = (props) => (event) => {
    setBarn({ ...barn, [props]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateAction(barn);

    setBarn({ ...barn, location: "", name: "", farm_id: farm_details?.id });

    cancelAction();
  };

  return (
    <div className={"barns__modal " + showModel}>
      <div className="barns__modal-content">
        <form className="barns__modal-body" onSubmit={handleSubmit} disabled>
          <h1 className="barns__modal-body__title">
            Add a <span>new Barn</span>
          </h1>
          <div className="barns__modal-body__field">
            {" "}
            <TextField
              label="Barn Name"
              variant="outlined"
              value={barn.name}
              onInput={handleInput("name")}
              InputProps={{
                readOnly: loading,
              }}
              required
            />
          </div>
          <div className="barns__modal-body__field">
            {" "}
            <TextField
              label="Farm Name"
              variant="outlined"
              defaultValue={farm_details?.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="barns__modal-body__field">
            {" "}
            <TextField
              label="Location"
              variant="outlined"
              value={barn.location}
              onInput={handleInput("location")}
              InputProps={{
                readOnly: loading,
              }}
              required
            />
          </div>
          <div className="barns__modal-body__btn-wrapper">
            <Button type="submit" variant="contained" disabled>
              Add
            </Button>
            <Button variant="contained" onClick={cancelAction}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
