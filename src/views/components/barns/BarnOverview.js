import React from "react";
import { Widget } from "../partials/Widget";
import { TextField } from "@mui/material";
import { ShimmerCategoryList } from "react-shimmer-effects";

export const BarnOverview = (props) => {
  // Defining method variables
  const state = props.barn;
  const barn_overview = state.barn_overview;
  const overview = state.barn_single.barnOverview
    ? state.barn_single.barnOverview[0]
    : {};

  if (state.loading) {
    return <ShimmerCategoryList title items={3} categoryStyle="STYLE_FOUR" />;
  }

  const WidgetChild = () => {
    return (
      <button
        onClick={() => state.editBarnOverview()}
        className="btn btn--icon widget__button"
      >
        <i className="icon icon-edit"></i>
      </button>
    );
  };

  return (
    <Widget
      title="Barn Overview"
      widget_action={{ edit: barn_overview.edit, child: <WidgetChild /> }}
    >
      <TextField
        className="widget__field"
        name="barn_name"
        label="Barn Name"
        value={overview.name ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: barn_overview.read_only,
        }}
      />
      <TextField
        className="widget__field"
        name="farm_name"
        label="Farm Name"
        value={overview.farm ? overview.farm.name : ""}
        variant="outlined"
        InputProps={{
          readOnly: barn_overview.read_only,
        }}
      />
      <TextField
        className="widget__field"
        name="location"
        label="Location"
        value={overview.location ?? ""}
        variant="outlined"
        InputProps={{
          readOnly: barn_overview.read_only,
        }}
      />
      {barn_overview.update && <button className="btn">Update</button>}
    </Widget>
  );
};
