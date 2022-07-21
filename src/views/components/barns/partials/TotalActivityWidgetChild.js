import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "../TotalAtivity";
import { submitGraphVisible } from "../../../../app/actions/BarnDetailActions";
import { useParams } from "react-router-dom";
import { checkPermission } from "../../../../app/hooks/with-permission";

export const WidgetChild = (props) => {
  const hasPermission = checkPermission("activity-sectionwise");
  const hasBarnPermission = checkPermission("add-remove-graph");
  const { barn_id, cycle_id } = useParams();
  const allSections = props.graph.allSections ?? {};
  const totalActivity = props.totalActivity;
  const dispatch = useDispatch();
  const { graph_modal } = useSelector((state) => {
    return {
      graph_modal: state.barn_detail?.graph_addition,
    };
  });

  const [graph, setGraph] = useState([]);

  const HandleChange = (e) => {
    let updatedValue = { current: e.target.value };
    props.setTotalActivity((totalActivity) => ({
      ...totalActivity,
      ...updatedValue,
    }));
  };

  const handleRemove = (props) => (event) => {
    let value = event.target.checked;
    const updatedGrapObj = Object.values(graph).map((element, index) => {
      if (element.graph === props) {
        element.value = value ? "1" : "0";
      }
      return element;
    });

    const obj = { ...graph_modal.graphs, graph_status: updatedGrapObj };

    dispatch(submitGraphVisible(barn_id, cycle_id, obj));
  };

  useEffect(() => {
    setGraph(graph_modal?.graphs?.graph_status);
  }, [graph_modal]);

  return (
    <div className="widget__action">
      <div className="widget__color">
        {totalActivity.current === "all" &&
          allSections &&
          allSections.map((section, i) => (
            <div key={i} className="widget__color_wrapper">
              <span
                style={{ backgroundColor: `${colors["s" + (i + 1)]}` }}
              ></span>{" "}
              {section.sectionName}
            </div>
          ))}
      </div>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        {hasPermission && (
          <Select
            id="demo-select-small"
            value={totalActivity.current}
            onChange={HandleChange}
          >
            <MenuItem value="barn">Barn</MenuItem>
            {allSections && <MenuItem value="all">All Sections</MenuItem>}
            {allSections &&
              allSections.map((section, i) => (
                <MenuItem key={i} value={"s" + (i + 1)}>
                  {section.sectionName}
                </MenuItem>
              ))}
          </Select>
        )}
      </FormControl>
      {hasBarnPermission && (
        <button
          className="btn btn--icon btn--gray"
          onClick={handleRemove("graph2")}
        >
          <i className="icon icon-trash"></i>
        </button>
      )}
    </div>
  );
};
