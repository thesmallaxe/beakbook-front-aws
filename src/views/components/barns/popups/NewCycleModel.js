import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  createCycleSubmit,
  hideCyclePopup,
} from "../../../../app/actions/CycleActions";
import { format } from "date-fns";
import { withPermission } from "../../../../app/hooks/with-permission";

const NewCycleModel = ({ barn_id }) => {
  const dispatch = useDispatch();
  const { success, cycle_modal, loading, cycle } = useSelector(
    (state) => state.cycle
  );
  const [data, setData] = useState(cycle);

  const showModel = cycle_modal ? "modal--show" : "";

  const handleInput = (props) => (event) => {
    setData({ ...data, [props]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCycleSubmit(data));
  };

  useEffect(() => {
    setData((data) => ({
      ...data,
      barn_id: barn_id,
    }));
  }, [barn_id]);

  useEffect(() => {
    setData((data) => ({
      ...data,
      ...cycle,
    }));
    dispatch(hideCyclePopup());
  }, [success, cycle, dispatch]);

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
              <TextField
                label="Breed"
                variant="outlined"
                value={data?.breed}
                onInput={handleInput("breed")}
                InputProps={{
                  readOnly: loading,
                }}
                fullWidth
                required
              />
            </div>
            <div className="modal__body__field">
              <TextField
                label="Origin"
                variant="outlined"
                onInput={handleInput("origin")}
                InputProps={{
                  readOnly: loading,
                }}
                value={data?.origin}
                fullWidth
              />
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__row--two-column">
              <div className="modal__body__field">
                <TextField
                  label="Starting Age (days)"
                  variant="outlined"
                  value={data?.starting_age}
                  onInput={handleInput("starting_age")}
                  InputProps={{
                    readOnly: loading,
                  }}
                  fullWidth
                  required
                />
              </div>
              <div className="modal__body__field">
                <TextField
                  label="Sex"
                  variant="outlined"
                  value={data?.sex}
                  onInput={handleInput("sex")}
                  InputProps={{
                    readOnly: loading,
                  }}
                  fullWidth
                  required
                />
              </div>
            </div>
            <div className="modal__body__field">
              <TextField
                label="Number of Chickens"
                variant="outlined"
                value={data?.population_number}
                onInput={handleInput("population_number")}
                InputProps={{
                  readOnly: loading,
                }}
                fullWidth
              />
            </div>
          </div>
          <div className="modal__body__row">
            <div className="modal__body__field">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Starting Date"
                  wrapperClassName="date-picker"
                  value={data?.selected_start_date}
                  minDate={new Date()}
                  onChange={(value) => {
                    setData({
                      ...data,
                      starting_date: format(new Date(value), "yyyy-MM-dd"),
                      selected_start_date: value,
                      selected_end_date: value,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="modal__body__field">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Desired Harvest Date"
                  wrapperClassName="date-picker"
                  minDate={new Date(data?.selected_start_date ?? "")}
                  value={data?.selected_end_date}
                  onChange={(value) => {
                    setData({
                      ...data,
                      end_date: format(new Date(value), "yyyy-MM-dd"),
                      selected_end_date: value,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="modal__body__row">
            <div className="modal__body__field">
              <TextField
                label="Desired Harvest Weight"
                variant="outlined"
                value={data?.harvest_weight}
                onInput={handleInput("harvest_weight")}
                InputProps={{
                  readOnly: loading,
                }}
                fullWidth
              />
            </div>
          </div>

          <div className="modal__body__action_wrapper">
            <Button type="submit" variant="contained">
              Start Cycle
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

export default withPermission(NewCycleModel, "add-cycle");
