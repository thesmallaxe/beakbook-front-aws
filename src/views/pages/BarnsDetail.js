import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "../components/Header";
import {
  BarnAnalysis,
  BarnOverview,
  AverageWeight,
  CycleDetails,
  StandardDeviation,
  TotalActivity,
  CycleSelection,
} from "../components/barns";

import {
  getSingleBarnDetails,
  editBarnOverview,
  editCycleDetails,
  handleAverageWeight,
  showGraphPopup,
} from "../../app/actions/BarnDetailActions";
import {
  showCyclePopup,
  showMortalityPopup,
} from "../../app/actions/CycleActions";
import { mapGraphs } from "../../app/services/Helper";
import { ShimmerThumbnail } from "react-shimmer-effects";
import NewCycleModel from "../components/barns/popups/NewCycleModel";
import { MortalityPopup } from "../components/barns/popups/MortalityPopup";
import { AddGraphPopup } from "../components/barns/popups/AddGraphPopup";
import { checkPermission } from "../../app/hooks/with-permission";

const sort_order = {
  section_1: ["barn_analysis", "barn_overview", "cycle_details"],
  section_2: ["average_weight", "total_activity", "standard_deviation"],
};

const BarnsDetail = (props) => {
  const barnRemovePermission = checkPermission("add-remove-graph");
  const cycleAddPermission = checkPermission("add-cycle");
  const mortalityPermission = checkPermission("add-mortality");
  const { barn_id, cycle_id } = useParams();
  const location = useLocation();
  const {
    fetchSingleBarn,
    loading,
    barn_single,
    handleAverageWeight,
    download,
    user,
    showNewCycle,
    showNewMotality,
    graph_modal,
    showGraphModal,
  } = props;

  const barn_modal = graph_modal?.show_modal;
  const graph_status = graph_modal?.graphs?.graph_status;
  const graphs = barn_single.graphs ? mapGraphs(barn_single.graphs) : {};

  const barn_overview = barn_single.barnOverview
    ? barn_single.barnOverview[0]
    : {};

  useEffect(() => {
    if (barn_id && cycle_id && !barn_modal) {
      fetchSingleBarn(barn_id, cycle_id);
    }
  }, [barn_modal, barn_id, cycle_id, fetchSingleBarn]);

  const back_btn = {
    label: barn_overview?.name ? barn_overview.name + " Details" : "Back",
    action: location?.state?.from?.pathname ?? "/",
  };

  return (
    <div className="container--fluid">
      <Header back={back_btn}>
        {cycleAddPermission && (
          <button className="btn" onClick={() => showNewCycle()}>
            Add new cycle
          </button>
        )}

        {mortalityPermission && (
          <button
            className="btn btn--white btn--border"
            onClick={() => showNewMotality()}
          >
            Add mortality count
          </button>
        )}
      </Header>
      <div className="container">
        <div className="barn_details">
          <div className="barn_details__wrapper">
            <DragDropContext>
              <Droppable droppableId="droppable-1">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="barn_details__actions">
                      {window.innerWidth >= 768 && (
                        <Draggable
                          draggableId="barn_analysis"
                          index={0}
                          key={0}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <BarnAnalysis
                                loading={loading}
                                analysis={barn_single.barnAnalysis}
                              />
                            </div>
                          )}
                        </Draggable>
                      )}
                      <Draggable draggableId="barn_overview" index={1} key={1}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <BarnOverview barn={props} />
                          </div>
                        )}
                      </Draggable>
                      <Draggable draggableId="cycle_details" index={2} key={2}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CycleDetails cycle={props} />
                          </div>
                        )}
                      </Draggable>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="barn_details__graphs">
              {window.innerWidth <= 768 && (
                <div className="barn_details__links">
                  <button
                    className="btn btn--link"
                    onClick={() => showNewCycle()}
                  >
                    Add new cycle
                  </button>
                  <button
                    className="btn btn--link btn--black"
                    onClick={() => showNewMotality()}
                  >
                    Add mortality count
                  </button>
                </div>
              )}
              <CycleSelection user={user} cycle={props} download={download} />
              {Object.keys(graphs).length === 0 && (
                <div>
                  <ShimmerThumbnail height={300} rounded />
                  <ShimmerThumbnail height={300} rounded />
                  <ShimmerThumbnail height={300} rounded />
                </div>
              )}
              {window.innerWidth < 768 && (
                <BarnAnalysis
                  loading={loading}
                  analysis={barn_single.barnAnalysis}
                />
              )}
              {graphs &&
                Object.keys(graphs).map((key) => {
                  let graph = graphs[key] ?? {};
                  switch (key) {
                    case "area":
                      return (
                        graph_status &&
                        (graph_status[0]?.value === 1 ||
                          graph_status[0]?.value === "1") && (
                          <AverageWeight
                            graph={graph}
                            loading={loading}
                            average_weight={props.average_weight}
                            handleEvent={handleAverageWeight}
                            key={key}
                          />
                        )
                      );

                    case "bar":
                      return (
                        graph_status &&
                        (graph_status[1]?.value === 1 ||
                          graph_status[1]?.value === "1") && (
                          <TotalActivity
                            graph={graph}
                            loading={loading}
                            key={key}
                          />
                        )
                      );

                    case "line":
                      return (
                        graph_status &&
                        (graph_status[2]?.value === 1 ||
                          graph_status[2]?.value === "1") && (
                          <StandardDeviation
                            graph={graph}
                            loading={loading}
                            key={key}
                          />
                        )
                      );

                    default:
                      return "";
                  }
                })}
              {cycleAddPermission && <NewCycleModel barn_id={barn_id} />}
              {mortalityPermission && (
                <MortalityPopup
                  barn_id={barn_id}
                  cycle={barn_single.cycleDetails}
                />
              )}
              {barnRemovePermission && <AddGraphPopup barn_id={barn_id} />}
              {barnRemovePermission &&
                (graph_status &&
                Object.values(graph_status).every(
                  (x) => x.value === "0" || x.value === 0
                ) ? (
                  <div className="barn_details__no_graph">
                    <p>
                      Graphs are not availble for the movment.
                      <br /> Please add the graph{" "}
                    </p>
                    <button className="btn btn--green" onClick={showGraphModal}>
                      + Add a graph
                    </button>
                  </div>
                ) : (
                  <div className="barn_details__graphs__actions">
                    <button className="btn btn--green" onClick={showGraphModal}>
                      + Add a graph
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.barn_detail.loading,
    barn_single: state.barn_detail.barn_details,
    barn_overview: state.barn_detail.barn_overview,
    cycle_details: state.barn_detail.cycle_details,
    average_weight: state.barn_detail.average_weight,
    graph_modal: state.barn_detail.graph_addition,
    download: state.barn_detail.download,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleBarn: (barn_id, cycle_id) =>
      dispatch(getSingleBarnDetails(barn_id, cycle_id)),
    editBarnOverview: () => dispatch(editBarnOverview()),
    editCycleDetails: () => dispatch(editCycleDetails()),
    handleAverageWeight: (arg = "barn") => dispatch(handleAverageWeight(arg)),
    showNewCycle: () => dispatch(showCyclePopup()),
    showNewMotality: () => dispatch(showMortalityPopup()),
    showGraphModal: () => dispatch(showGraphPopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarnsDetail);
