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
import {
  BarnTableItem,
  AddBarnModel,
  BarnMobileItem,
  RenameBarnModel,
} from "../components/barns/listing";
import { ShimmerTable } from "react-shimmer-effects";
import Paginator from "../components/Paginator";
import Header from "../components/Header";
import { DownloadPopup } from "../components/barns/popups/DownloadPopup";

const Barns = (props) => {
  const {
    loading,
    success,
    error,
    user,
    barns,
    searchBarns,
    renameBarn,
    addToFavourite,
    removeFromFavourite,
    addNewBarn,
    farm_details,
    pagination,
  } = props;

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
        <div className="barns">
          <div className="barns__overview">
            <div className="barns__table-title-block">
              <h3 className="barns__table-title">Barn Overview</h3>
              <form className="barns__search-form">
                <i className="icon icon-search"></i>
                <input
                  className="barns__search-input"
                  type="search"
                  placeholder="Search Barns"
                  onInput={handleChange}
                />
              </form>
            </div>
            {window.innerWidth >= 768 ? (
              <>
                <div className="barns__table-content">
                  {Object.keys(barns).length === 0 && loading && (
                    <ShimmerTable row={5} col={5} />
                  )}
                  {barns && (
                    <table className="barns__table">
                      <thead>
                        <tr>
                          <th>Barn Name</th>
                          <th>Weight</th>
                          <th>Farm</th>
                          <th>Mortality</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {barns &&
                          Object.keys(barns).map((key) => {
                            return (
                              <BarnTableItem
                                user={user}
                                key={key}
                                barn={barns[key]}
                                showDownloadPopup={handleShowPopup}
                                showRenamebarn={handleShowRenameBarn}
                                addToFavourite={addToFavourite}
                                removeFromFavourite={removeFromFavourite}
                              />
                            );
                          })}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            ) : (
              <div className="barns__list">
                {barns &&
                  Object.keys(barns).map((key) => {
                    return (
                      <BarnMobileItem
                        user={user}
                        key={key}
                        barn={barns[key]}
                        showDownloadPopup={handleShowPopup}
                        showRenamebarn={handleShowRenameBarn}
                        addToFavourite={addToFavourite}
                        removeFromFavourite={removeFromFavourite}
                      />
                    );
                  })}
              </div>
            )}
            <Paginator
              path="barns"
              data={pagination}
              paginateAction={handlePagination}
              search={search.search}
            />
          </div>
          <button
            className="barns__add-new"
            id="myBtn"
            onClick={handleShowBarn}
          >
            <i className="icon icon-add"></i>
          </button>
          <RenameBarnModel
            barn={barnDetail}
            show={showRename}
            loading={loading}
            success={success}
            error={error}
            cancelAction={handleShowRenameBarn}
            handleRenameAction={renameBarn}
          />
          <AddBarnModel
            farm_details={farm_details}
            show={show}
            loading={loading}
            success={success}
            error={error}
            cancelAction={handleShowBarn}
            handleCreateAction={addNewBarn}
          />
          {props.download.show && (
            <DownloadPopup
              state={props}
              show={props.download.show}
              barn_id={barn.barn_id}
              cycle_id={barn.cycle_id}
              cycles={barn.cycles}
              user={user}
            />
          )}
        </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Barns);
