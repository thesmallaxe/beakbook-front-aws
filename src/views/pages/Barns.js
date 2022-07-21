import { useState } from "react";
import { connect } from "react-redux";
import {
  createBarn,
  hideDwnloadPopup,
  renameBarnAction,
  searchBarns,
  showDownloadPopup,
  triggerDownload,
} from "../../app/actions/BarnActions";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../app/actions/FavouriteActions";
import Header from "../components/Header";
import { showCyclePopup } from "../../app/actions/CycleActions";
import { checkPermission } from "../../app/hooks/with-permission";
import BarnContainer from "../components/barns/listing/BarnContainer";

const Barns = (props) => {
  const { user, barns, searchBarns, farm_details } = props;

  const cycleAddPermission = checkPermission("add-cycle");

  const [search, setSearch] = useState({ search: null, page: 1 });
  const [barnDetail, setBarnDetail] = useState({ barn_id: "", name: "" });
  const [showRename, setShowRename] = useState(false);
  const [show, setShow] = useState(false);
  const [barn, setBarn] = useState({
    barn_id: null,
    cycle_id: null,
    cycles: [],
  });

  const handleChange = (event) => {
    setSearch({ ...search, search: event.target.value });
    searchBarns(farm_details.id, event.target.value);
  };

  const handlePagination = (search, page) => {
    searchBarns(farm_details.id, search, page);
  };

  const handleShowBarn = (event) => {
    setShow(!show);
  };

  const handleShowRenameBarn = (barn_id, name) => {
    setBarnDetail({
      barn_id: barn_id,
      name: name,
    });

    setShowRename(!showRename);
  };

  const handleShowPopup = (barn__id, cycle__id, cycles) => {
    setBarn({
      ...barn,
      barn_id: barn__id,
      cycle_id: cycle__id,
      cycles: cycles,
    });

    props.showPopup(cycles);
  };

  const addNewCycle = (barn_id) => {
    setBarn({
      ...barn,
      barn_id: barn_id,
    });

    props.showNewCycle();
  };

  return (
    <div className="container--fluid">
      <Header />
      <div className="container">
        <div className="dashboard__welcome">
          <h3 className="dashboard__welcome_title">
            Hello, <strong>{user?.name ?? "User"}</strong>
          </h3>
          <div className="dashboard__welcome_block">
            <p className="dashboard__welcome_text">
              <span className="muted_text">
                Here you can view all of your Barns
              </span>
            </p>
          </div>
        </div>
        <BarnContainer
          {...props}
          length={Object.keys(barns).length}
          barn={barn}
          cycleAddPermission={cycleAddPermission}
          search={search.search}
          barnDetail={barnDetail}
          showRename={showRename}
          show={show}
          handleChange={handleChange}
          handlePagination={handlePagination}
          handleShowBarn={handleShowBarn}
          handleShowRenameBarn={handleShowRenameBarn}
          handleShowPopup={handleShowPopup}
          addNewCycle={addNewCycle}
          download={props.download}
          props={props}
        ></BarnContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    farm_details: state.auth.farm_details,
    loading: state.barns.loading,
    download: state.barns.download,
    barns: state.barns.results.data ?? {},
    pagination: state.barns.results.meta,
    search: state.barns.search,
    success: state.barns.success,
    error: state.barns.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchBarns: (arg, arg2, arg3) => dispatch(searchBarns(arg, arg2, arg3)),
    showPopup: (cycles = []) => dispatch(showDownloadPopup(cycles)),
    hidePopup: () => dispatch(hideDwnloadPopup()),
    triggerDownload: (obj) => dispatch(triggerDownload(obj)),
    addNewBarn: (obj) => dispatch(createBarn(obj)),
    renameBarn: (obj) => dispatch(renameBarnAction(obj)),
    addToFavourite: (obj) => dispatch(addToFavourite(obj)),
    removeFromFavourite: (obj) => dispatch(removeFromFavourite(obj)),
    showNewCycle: () => dispatch(showCyclePopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Barns);
