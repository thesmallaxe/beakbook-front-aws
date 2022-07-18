import { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { Widget } from "../partials/Widget";
import { TextField } from "@mui/material";
import { ShimmerCategoryList } from "react-shimmer-effects";
import { updateCycleDetailAction } from "../../../app/actions/BarnDetailActions";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

export const CycleDetails = (props) => {
  // Defining method variables
  const state = props.cycle;
  const cycle_details = state.cycle_details;
  const cycle_data = state.cycle_details.data;
  const [cycle, setCycle] = useState({});
  const dispatch = useDispatch();

  const WidgetChild = () => {
    return (
      <button
        onClick={() => state.editCycleDetails()}
        className="btn btn--icon widget__button"
      >
        <i className="icon icon-edit"></i>
      </button>
    );
  };

  const handleChange = (event) => {
    setCycle((cycle) => ({
      ...cycle,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(cycle);
    dispatch(updateCycleDetailAction(cycle));
  };

  useEffect(() => {
    if (cycle_data !== undefined || cycle_data) {
      setCycle({ ...cycle_data, cycle_id: cycle_data.id });
    }
  }, [cycle_data]);

  if (state.loading) {
    return <ShimmerCategoryList title items={7} categoryStyle="STYLE_FOUR" />;
  }

  return (
    <Widget
      title="Cycle Details"
      widget_action={{ edit: cycle_details.edit, child: <WidgetChild /> }}
    >
      <TextField
        name="breed"
        className="widget__field"
        onChange={handleChange}
        label="Breed"
        value={cycle?.breed ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        name="starting_age"
        onChange={handleChange}
        className="widget__field"
        label="Starting Age (days)"
        value={cycle?.starting_age ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        name="sex"
        onChange={handleChange}
        className="widget__field"
        label="Sex"
        value={cycle?.sex ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <div className="widget__row">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Starting date"
            wrapperClassName="date-picker"
            readOnly={cycle_details.read_only}
            value={new Date(cycle?.starting_date ?? "")}
            onChange={(value) => {
              setCycle({
                ...cycle,
                starting_date: format(new Date(value), "yyyy-MM-dd"),
              });
            }}
            renderInput={(params) => (
              <TextField {...params} className="widget__field" required />
            )}
          />
        </LocalizationProvider>
        <TextField
          name="harvest_weight"
          onChange={handleChange}
          className="widget__field"
          title="Desired Harvest Weight"
          label="Desired Harvest Weight"
          value={cycle?.harvest_weight ?? ""}
          variant="outlined"
          InputProps={{
            readOnly: cycle_details.read_only,
          }}
        />
      </div>
      <TextField
        name="origin"
        onChange={handleChange}
        className="widget__field"
        label="Origin"
        value={cycle?.origin ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        name="population_number"
        onChange={handleChange}
        className="widget__field"
        label="Number of Chickens"
        value={cycle?.population_number ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Desired Harvest Date"
          wrapperClassName="date-picker"
          readOnly={cycle_details.read_only}
          minDate={new Date(cycle?.starting_date ?? "")}
          value={new Date(cycle?.end_date ?? "")}
          onChange={(value) => {
            setCycle({
              ...cycle,
              end_date: format(new Date(value), "yyyy-MM-dd"),
            });
          }}
          renderInput={(params) => (
            <TextField {...params} className="widget__field" required />
          )}
        />
      </LocalizationProvider>
      {cycle_details.update && (
        <button type="submit" className="btn" onClick={handleSubmit}>
          Update
        </button>
      )}
    </Widget>
  );
};
