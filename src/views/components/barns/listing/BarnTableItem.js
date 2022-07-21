import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkPermission } from "../../../../app/hooks/with-permission";

export const BarnTableItem = (props) => {
  const cycleAddPermission = checkPermission("add-cycle");
  const favAddPermission = checkPermission("Favouriting-barn");
  const renamePermission = checkPermission("rename-barn");
  const barnDownloadPermission = checkPermission("download-barn");
  const sectionDownloadPermission = checkPermission("download-sectionwise");
  const [fav, setFav] = useState(false);
  const location = useLocation();
  const barn = props.barn;
  const barn_id = barn.barn_id;
  const cycles = barn.cycle_id;
  const cycle_id = cycles[cycles.length - 1]?.cycle_id;
  const diffClass = barn.weight_diff.toString().includes("-")
    ? "decreased"
    : "increased";
  const url = cycle_id ? "/barns/" + barn_id + "/cycle/" + cycle_id : "#";
  const favourite = { barn_id: barn_id, user_id: props.user.id };

  const handleFavourite = () => {
    setFav(true);
    props.addToFavourite(favourite);
  };

  const handleFavouriteRemove = () => {
    setFav(false);
    props.removeFromFavourite(favourite);
  };

  useEffect(() => {
    if (barn.fav_barn !== 0) {
      setFav(true);
    }
  }, [barn]);
  return (
    <tr>
      <td>
        <Link key={barn_id} state={{ from: location }} to={url}>
          <i className="icon icon-shop"></i> {barn.name}
        </Link>
      </td>
      <td>
        {barn.weight}{" "}
        <span className={"barns__table__weight-" + diffClass}>
          ({barn.weight_diff})
        </span>
      </td>
      <td>{barn.farm}</td>
      <td>{barn.mortality}</td>
      <td>
        {favAddPermission && (
          <button
            className={
              "add_favourite " +
              (!fav ? "add_favourite--not" : "add_favourite--add")
            }
            onClick={!fav ? handleFavourite : handleFavouriteRemove}
          >
            <i
              className={
                "icon " + (!fav ? "icon-favourite" : "icon-favourite-alt")
              }
            ></i>
          </button>
        )}
      </td>
      <td>
        <button className="barns__table__options-icon">
          <i className="icon icon-kebab"></i>
        </button>
        <div className="barns__table__options">
          {renamePermission && (
            <a
              href="#rename"
              onClick={() => props.showRenamebarn(barn_id, barn.name)}
            >
              Rename
            </a>
          )}
          {(barnDownloadPermission || sectionDownloadPermission) && (
            <a
              href="#download"
              onClick={() => props.showDownloadPopup(barn_id, cycle_id, cycles)}
            >
              Download
            </a>
          )}

          {cycleAddPermission && (
            <a
              href="#add-new-cycle"
              onClick={() => props.showNewCycle(barn_id)}
            >
              Add new cycle
            </a>
          )}
        </div>
      </td>
    </tr>
  );
};
