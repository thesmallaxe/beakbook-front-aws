import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCycleSubmit,
  hideCyclePopup,
} from "../../../app/actions/CycleActions";

export const NewCycleModel = () => {
  const dispatch = useDispatch();
  const { show, loading, cycle } = useSelector((state) => state.cycle);
  const [data, setData] = useState(cycle);

  const showModel = show ? "modal--show" : "";

  const handleInput = (props) => (event) => {
    setData({ ...data, [props]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCycleSubmit(cycle));

    setData({});
  };
  return (
    <div className={"modal " + showModel}>
      <div className="modal__content">
        <form className="modal__body" onSubmit={handleSubmit} disabled>
          <h1 className="modal__body__title">
            Start a <span>new Cycle</span>
          </h1>
          <p className="modal__body__description">
            Please fill-in the cycle information to start
          </p>
          <div className="modal__body__row">
            <div className="modal__body__field">
              {" "}
              <TextField
                label="Breed"
                variant="outlined"
                value={data?.breed}
                onInput={handleInput("name")}
                InputProps={{
                  readOnly: loading,
                }}
                fullWidth
                required
              />
            </div>
            <div className="modal__body__field">
              {" "}
              <TextField
                label="Origin"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                value={data?.origin}
                fullWidth
              />
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__row">
              <div className="modal__body__field">
                {" "}
                <TextField
                  label="Starting Age (days)"
                  variant="outlined"
                  value={data?.starting_age}
                  onInput={handleInput("location")}
                  InputProps={{
                    readOnly: loading,
                  }}
                  fullWidth
                  required
                />
              </div>
              <div className="modal__body__field">
                {" "}
                <TextField
                  label="Sex"
                  variant="outlined"
                  value={data?.sex}
                  onInput={handleInput("location")}
                  InputProps={{
                    readOnly: loading,
                  }}
                  fullWidth
                  required
                />
              </div>
            </div>
            <div className="modal__body__field">
              {" "}
              <TextField
                label="Number of Chickens"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__field">
              {" "}
              <TextField
                label="Starting Date"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </div>
            <div className="modal__body__field">
              {" "}
              <TextField
                label="Desired Harvest Date"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </div>
          </div>

          <div className="modal__body__row">
            <div className="modal__body__field">
              {" "}
              <TextField
                label="Desired Harvest Weightn"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </div>
          </div>

          <div className="modal__body__action_wrapper">
            <Button type="submit" variant="contained">
              Start cycle now
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(hideCyclePopup())}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
