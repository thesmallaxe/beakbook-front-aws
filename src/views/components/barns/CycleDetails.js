import React from "react";
import { Widget } from "../partials/Widget";
import { TextField } from "@mui/material";
import { ShimmerCategoryList } from "react-shimmer-effects";

export const CycleDetails = (props) => {
  // Defining method variables
  const state = props.cycle;
  const cycle_details = state.cycle_details;
  const detail = state.barn_single.cycleDetails ?? {};
  const barn = state.barn_single.barnOverview
    ? state.barn_single.barnOverview[0]
    : {};

  if (state.loading) {
    return <ShimmerCategoryList title items={7} categoryStyle="STYLE_FOUR" />;
  }

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

  return (
    <Widget
      title="Cycle Details"
      widget_action={{ edit: cycle_details.edit, child: <WidgetChild /> }}
    >
      <TextField
        className="widget__field"
        label="Breed"
        value={detail.breed ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        className="widget__field"
        label="Starting Age (days)"
        value={detail.starting_age ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        className="widget__field"
        label="Sex"
        value={detail.sex ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <div className="widget__row">
        <TextField
          className="widget__field"
          label="Starting Date"
          value={detail.starting_date ?? ""}
          variant="outlined"
          InputProps={{
            readOnly: cycle_details.read_only,
          }}
        />
        <TextField
          className="widget__field"
          label="Desired Harvest Weight"
          value="3.6 kg"
          variant="outlined"
          InputProps={{
            readOnly: cycle_details.read_only,
          }}
        />
      </div>
      <TextField
        className="widget__field"
        label="Origin"
        value={barn.farm?.location ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        className="widget__field"
        label="Number of Chickens"
        value={detail.population_number ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      <TextField
        className="widget__field"
        label="Desired Harvest Date"
        value={detail.end_date ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: cycle_details.read_only,
        }}
      />
      {cycle_details.update && <button className="btn">Update</button>}
    </Widget>
  );
};
