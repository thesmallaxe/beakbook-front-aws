import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createMortalitySubmit,
  hideMortalityPopup,
} from "../../../app/actions/CycleActions";
import { format } from "date-fns";

export const MortalityPopup = ({ barn_id, cycle }) => {
  const dispatch = useDispatch();
  const cycle_state = useSelector((state) => state.cycle);
  const [mortality, setMortality] = useState({
    barn_id: barn_id,
    cycle_id: cycle?.id,
    date: "",
    mortality_number: "",
    selected_date: null,
  });

  const showModel = cycle_state.mortality_modal ? "modal--show" : "modal--hide";

  const handleChange = (props) => (event) => {
    if (event.target.value > 0) {
      setMortality((mortality) => ({
        ...mortality,
        [props]: event.target.value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createMortalitySubmit(mortality));
  };

  React.useEffect(() => {
    setMortality((mortality) => ({
      ...mortality,
      cycle_id: cycle?.id,
    }));
  }, [cycle]);

  React.useEffect(() => {
    setMortality((mortality) => ({
      ...mortality,
      date: "",
      mortality_number: "",
      selected_date: null,
    }));
    dispatch(hideMortalityPopup());
  }, [cycle_state.success, dispatch]);

  return (
    <div className={"modal modal--small " + showModel} id="mortalityPopup">
      <div className="modal__content">
        <form className="modal__body" onSubmit={handleSubmit} disabled>
          <div className="modal__image">
            <img src="/assets/img/chicken-pic.png" alt="mortality-count" />
          </div>
          <div className="modal__desc">
            <h3>Chicken</h3>
            <p>
              <abbr>mortality</abbr> today
            </p>
          </div>
          <div className="modal__body__field">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                minDate={new Date(cycle?.starting_date ?? "")}
                maxDate={new Date(cycle?.end_date ?? "")}
                value={mortality?.selected_date}
                onChange={(value) => {
                  setMortality({
                    ...mortality,
                    date: format(new Date(value), "yyyy-MM-dd"),
                    selected_date: value,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
            <TextField
              type="number"
              InputProps={{
                readOnly: false,
              }}
              onInput={handleChange("mortality_number")}
              value={mortality?.mortality_number}
              min="1"
              fullWidth
              required
            />
          </div>

          <div className="modal__body__action_wrapper">
            <Button type="submit" variant="contained">
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(hideMortalityPopup())}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
