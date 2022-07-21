import {
  BarnTableItem,
  AddBarnModel,
  BarnMobileItem,
  RenameBarnModel,
} from "./";
import { ShimmerTable } from "react-shimmer-effects";
import Paginator from "../../Paginator";
import NewCycleModel from "../popups/NewCycleModel";
import { DownloadPopup } from "../popups/DownloadPopup";
import {
  checkPermission,
  withPermission,
} from "../../../../app/hooks/with-permission";
import BarnSearchInput from "./BarnSearchInput";

const BarnContainer = (props) => {
  const barnAddPermission = checkPermission("add-barn");
  const barns = props.barns;
  return (
    <div className="barns">
      <div className="barns__overview">
        <div className="barns__table-title-block">
          <h3 className="barns__table-title">Barn Overview</h3>
          <BarnSearchInput handleChange={props.handleChange} />
        </div>
        {window.innerWidth >= 768 ? (
          <>
            <div className="barns__table-content">
              {props.length === 0 && props.loading && (
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
                            user={props.user}
                            key={key}
                            barn={barns[key]}
                            showDownloadPopup={props.handleShowPopup}
                            showRenamebarn={props.handleShowRenameBarn}
                            addToFavourite={props.addToFavourite}
                            removeFromFavourite={props.removeFromFavourite}
                            showNewCycle={props.addNewCycle}
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
                    user={props.user}
                    key={key}
                    barn={barns[key]}
                    showDownloadPopup={props.handleShowPopup}
                    showRenamebarn={props.handleShowRenameBarn}
                    addToFavourite={props.addToFavourite}
                    removeFromFavourite={props.removeFromFavourite}
                  />
                );
              })}
          </div>
        )}
        <Paginator
          path="barns"
          data={props.pagination}
          paginateAction={props.handlePagination}
          search={props.search}
        />
      </div>
      {barnAddPermission && (
        <>
          <button
            className="barns__add-new"
            id="myBtn"
            onClick={props.handleShowBarn}
          >
            <i className="icon icon-add"></i>
          </button>
          <AddBarnModel
            farm_details={props.farm_details}
            show={props.show}
            loading={props.loading}
            success={props.success}
            error={props.error}
            cancelAction={props.handleShowBarn}
            handleCreateAction={props.addNewBarn}
          />
        </>
      )}

      <RenameBarnModel
        barn={props.barnDetail}
        show={props.showRename}
        loading={props.loading}
        success={props.success}
        error={props.error}
        cancelAction={props.handleShowRenameBarn}
        handleRenameAction={props.renameBarn}
      />

      {props.download.show && (
        <DownloadPopup
          state={props.props}
          show={props.download.show}
          barn_id={props.barn.barn_id}
          cycle_id={props.barn.cycle_id}
          cycles={props.barn.cycles}
          user={props.user}
        />
      )}
      {props.cycleAddPermission && (
        <NewCycleModel barn_id={props.barn.barn_id} />
      )}
    </div>
  );
};

export default withPermission(BarnContainer, "view-barn", true);
