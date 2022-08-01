import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";

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
import NewCycleModel from "../components/barns/popups/NewCycleModel";
import { MortalityPopup } from "../components/barns/popups/MortalityPopup";
import { AddGraphPopup } from "../components/barns/popups/AddGraphPopup";
import { checkPermission } from "../../app/hooks/with-permission";

import { BarnDetailContainer } from "../components/barns/BarnDetailContainer";
import { BarnGraphContainer } from "../components/barns/BarnGraphContainer";

const BarnsDetail = (props) => {
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

  const { barn_id, cycle_id } = useParams();
  const location = useLocation();
  const barnRemovePermission = checkPermission("add-remove-graph");
  const cycleAddPermission = checkPermission("add-cycle");
  const mortalityPermission = checkPermission("add-mortality");
  const barn_modal = graph_modal?.show_modal;
  const graph_status = graph_modal?.graphs?.graph_status;
  const graphs = barn_single.graphs ? mapGraphs(barn_single.graphs) : {};

  const barn_overview = barn_single.barnOverview
    ? barn_single.barnOverview[0]
    : {};

  const back_btn = {
    label: barn_overview?.name ? barn_overview.name + " Details" : "Back",
    action: location?.state?.from?.pathname ?? "/",
  };

  useEffect(() => {
    if (barn_id && cycle_id && !barn_modal) {
      fetchSingleBarn(barn_id, cycle_id);
    }
  }, [barn_modal, barn_id, cycle_id, fetchSingleBarn]);

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
            <BarnDetailContainer
              loading={loading}
              barnAnalysis={barn_single.barnAnalysis}
              props={props}
            />
            <BarnGraphContainer
              loading={loading}
              barnAnalysis={barn_single.barnAnalysis}
              handleAverageWeight={handleAverageWeight}
              download={download}
              user={user}
              showNewCycle={showNewCycle}
              showNewMotality={showNewMotality}
              graph_status={graph_status}
              length={Object.keys(graphs).length}
              graphs={graphs}
              props={props}
              average_weight={props.average_weight}
            >
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
            </BarnGraphContainer>
          </div>
          {cycleAddPermission && <NewCycleModel barn_id={barn_id} />}
          {mortalityPermission && (
            <MortalityPopup
              barn_id={barn_id}
              cycle={barn_single.cycleDetails}
            />
          )}
          {barnRemovePermission && <AddGraphPopup barn_id={barn_id} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.barn_detail.loading,
    sort_order: state.barn_order.order,
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
