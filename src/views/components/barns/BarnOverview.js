import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { Widget } from "../partials/Widget";
import { TextField } from "@mui/material";
import { ShimmerCategoryList } from "react-shimmer-effects";
import { updateBarnOverviewAction } from "../../../app/actions/BarnDetailActions";
import {
  checkPermission,
  withPermission,
} from "../../../app/hooks/with-permission";

const BarnOverview = (props) => {
  // Defining method variables
  const state = props.barn;
  const barn_overview = state.barn_overview;
  const overview = barn_overview.data;
  const [barn, setBarn] = useState({});
  const dispatch = useDispatch();
  const hasPermision = checkPermission("edit-all-barn-overview");

  const WidgetChild = () => {
    return (
      hasPermision && (
        <button
          onClick={() => state.editBarnOverview()}
          className="btn btn--icon widget__button"
        >
          <i className="icon icon-edit"></i>
        </button>
      )
    );
  };

  const handleChange = (event) => {
    setBarn((barn) => ({
      ...barn,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateBarnOverviewAction(barn));
  };

  useEffect(() => {
    const barn_data = overview ? overview[0] : {};
    setBarn(barn_data);
  }, [overview]);

  if (state.loading) {
    return <ShimmerCategoryList title items={3} categoryStyle="STYLE_FOUR" />;
  }

  return (
    <Widget
      title="Barn Overview"
      widget_action={{ edit: barn_overview.edit, child: <WidgetChild /> }}
    >
      <TextField
        className="widget__field"
        name="name"
        label="Barn Name"
        value={barn.name ?? ""}
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          readOnly: barn_overview.read_only,
        }}
        fullWidth
      />
      <TextField
        className="widget__field"
        name="farm_name"
        label="Farm Name"
        value={barn.farm ? barn.farm.name : ""}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
      <TextField
        className="widget__field"
        name="location"
        label="Location"
        value={barn.location ?? ""}
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          readOnly: barn_overview.read_only,
        }}
        fullWidth
      />
      {hasPermision && barn_overview.update && (
        <button type="submit" onClick={handleSubmit} className="btn">
          Update
        </button>
      )}
    </Widget>
  );
};

export default withPermission(BarnOverview, "view-all-barn-overview");
