import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export const RenameBarnModel = ({
  barn,
  loading,
  show = false,
  cancelAction,
  handleRenameAction,
}) => {
  const showModel = show ? "barns__modal--show" : "";
  const farm_details = useSelector((state) => state.auth.farm_details);
  const [barnDetail, setBarn] = useState({
    name: barn.name ?? "",
    id: barn.barn_id ?? "",
    farm_id: farm_details.id,
  });

  const handleInput = (props) => (event) => {
    setBarn({ ...barnDetail, [props]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRenameAction(barnDetail);
    cancelAction();
  };

  useEffect(() => {
    setBarn((barnDetail) => ({
      ...barnDetail,
      name: barn.name ?? "",
      id: barn.barn_id ?? "",
    }));
  }, [barn]);

  return (
    <div className={"barns__modal " + showModel}>
      <div className="barns__modal-content">
        <form className="barns__modal-body" onSubmit={handleSubmit}>
          <h1 className="barns__modal-body__title">
            Rename <span>Barn</span>
          </h1>
          <div className="barns__modal-body__field">
            {" "}
            <TextField
              label="Barn Name"
              variant="outlined"
              value={barnDetail.name ?? ""}
              onInput={handleInput("name")}
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
