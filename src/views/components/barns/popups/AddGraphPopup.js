import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  closeGraphPopup,
  submitGraphVisible,
} from "../../../../app/actions/BarnDetailActions";
import { useParams } from "react-router-dom";

export const AddGraphPopup = () => {
  const dispatch = useDispatch();
  const { barn_id, cycle_id } = useParams();
  const { graph_modal } = useSelector((state) => {
    return {
      graph_modal: state.barn_detail?.graph_addition,
    };
  });

  const [graph, setGraph] = useState({});
  const showModel = graph_modal.show_modal ? "modal--show" : "modal--hide";

  const handleChange = (props) => (event) => {
    let value = event.target.checked;
    const updatedGrapObj = Object.values(graph).map((element, index) => {
      if (element.graph === props) {
        element.value = value ? "1" : "0";
      }
      return element;
    });

    setGraph(updatedGrapObj);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const obj = { ...graph_modal.graphs, graph_status: graph };

    dispatch(submitGraphVisible(barn_id, cycle_id, obj));
  };

  useEffect(() => {
    setGraph((graph) => ({ ...graph, ...graph_modal.graphs?.graph_status }));
  }, [graph_modal]);

  const customColor = {
    color: "#ebebeb",
    "&.Mui-checked": {
      color: "#f97916",
    },
  };

  return (
    <div className={"modal " + showModel} id="addGraphPopup">
      <div className="modal__content">
        <form
          className="modal__body modal__body--center"
          onSubmit={handleSubmit}
          disabled
        >
          <h1 className="modal__body__title">
            Add a <span>Graph</span>
          </h1>
          <p className="modal__body__description">
            Please select the graphs to be displayed on this page
          </p>
          <div className="modal__body__field">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange("graph1")}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={customColor}
                    checked={
                      graph &&
                      (graph[0]?.value === 1 || graph[0]?.value === "1")
                        ? true
                        : false
                    }
                  />
                }
                label="Average weight"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange("graph2")}
                    sx={customColor}
                    inputProps={{ "aria-label": "controlled" }}
                    checked={
                      graph &&
                      (graph[1]?.value === 1 || graph[1]?.value === "1")
                        ? true
                        : false
                    }
                  />
                }
                label="Total activity"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange("graph3")}
                    inputProps={{ "aria-label": "controlled" }}
                    checked={
                      graph &&
                      (graph[2]?.value === 1 || graph[2]?.value === "1")
                        ? true
                        : false
                    }
                    sx={customColor}
                  />
                }
                label="Standard deviation"
              />
            </FormGroup>
          </div>

          <div className="modal__body__action_wrapper">
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(closeGraphPopup())}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
