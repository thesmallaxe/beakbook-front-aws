import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  AverageWeight,
  BarnAnalysis,
  BarnOverview,
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
  getSingleBarnDetailsGraphs,
} from "../../app/actions/BarnDetailActions";
import {
  showCyclePopup,
  showMortalityPopup,
} from "../../app/actions/CycleActions";
import { mapGraphs } from "../../app/services/Helper";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { NewCycleModel } from "../components/barns/NewCycleModel";
import { MortalityPopup } from "../components/barns/MortalityPopup";

const BarnsDetail = (props) => {
  const { barn_id, cycle_id } = useParams();
  const location = useLocation();
  const {
    fetchSingleBarn,
    fetchSingleGraphs,
    loading,
    barn_single,
    handleAverageWeight,
    download,
    user,
    showNewCycle,
    showNewMotality,
  } = props;

  const graphs = barn_single.graphs ? mapGraphs(barn_single.graphs) : {};
  const barn_overview = barn_single.barnOverview
    ? barn_single.barnOverview[0]
    : {};

  useEffect(() => {
    if (barn_id && cycle_id) {
      fetchSingleBarn(barn_id, cycle_id);
    }
  }, [barn_id, cycle_id, fetchSingleBarn]);

  useEffect(() => {
    const graphNames = [
      "Average Weight",
      "Total Activity",
      "Standard Deviation",
    ];
    graphNames.forEach((name) => {
      if (barn_id && cycle_id) {
        fetchSingleGraphs(barn_id, cycle_id, name);
      }
    });
  }, [barn_id, cycle_id, fetchSingleGraphs]);

  const back_btn = {
    label: barn_overview?.name ? barn_overview.name + " Details" : "Back",
    action: location?.state?.from?.pathname ?? "/",
  };

  return (
    <div className="barn_details">
      <Header back={back_btn}>
        <button className="btn" onClick={() => showNewCycle()}>
          Add new cycle
        </button>
        <button
          className="btn btn--white btn--border"
          onClick={() => showNewMotality()}
        >
          Add mortality count
        </button>
      </Header>
      <div className="barn_details__wrapper">
        <div className="barn_details__actions">
          <BarnAnalysis loading={loading} analysis={barn_single.barnAnalysis} />
          <BarnOverview barn={props} />
          <CycleDetails cycle={props} />
        </div>
        <div className="barn_details__graphs">
          <CycleSelection user={user} cycle={props} download={download} />
          {Object.keys(graphs).length === 0 && (
            <div>
              <ShimmerThumbnail height={300} rounded />
              <ShimmerThumbnail height={300} rounded />
              <ShimmerThumbnail height={300} rounded />
            </div>
          )}
          {graphs &&
            Object.keys(graphs).map((key) => {
              let graph = graphs[key] ?? {};
              switch (key) {
                case "area":
                  return (
                    <AverageWeight
                      graph={graph}
                      loading={loading}
                      average_weight={props.average_weight}
                      handleEvent={handleAverageWeight}
                      key={key}
                    />
                  );

                case "bar":
                  return (
                    <TotalActivity graph={graph} loading={loading} key={key} />
                  );

                default:
                  return (
                    <StandardDeviation
                      graph={graph}
                      loading={loading}
                      key={key}
                    />
                  );
              }
            })}
          <NewCycleModel barn_id={barn_id} />
          <MortalityPopup barn_id={barn_id} cycle={barn_single.cycleDetails} />
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
    download: state.barn_detail.download,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleBarn: (barn_id, cycle_id) =>
      dispatch(getSingleBarnDetails(barn_id, cycle_id)),
    fetchSingleGraphs: (barn_id, cycle_id, name) =>
      dispatch(getSingleBarnDetailsGraphs(barn_id, cycle_id, name)),
    editBarnOverview: () => dispatch(editBarnOverview()),
    editCycleDetails: () => dispatch(editCycleDetails()),
    handleAverageWeight: (arg = "barn") => dispatch(handleAverageWeight(arg)),
    showNewCycle: () => dispatch(showCyclePopup()),
    showNewMotality: () => dispatch(showMortalityPopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarnsDetail);
