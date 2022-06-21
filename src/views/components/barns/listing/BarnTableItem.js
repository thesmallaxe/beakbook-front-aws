import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BarnTableItem = (props) => {
  const [fav, setFav] = useState(false);
  const barn = props.barn;
  const barn_id = barn.barn_id;
  const cycles = barn.cycle_id;
  const cycle_id = cycles[0]?.cycle_id;
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
        <Link key={barn_id} to={url}>
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
      </td>
      <td>
        <button className="barns__table__options-icon">
          <i className="icon icon-kebab"></i>
        </button>
        <div className="barns__table__options">
          <a
            href="#rename"
            onClick={() => props.showRenamebarn(barn_id, barn.name)}
          >
            Rename
          </a>
          <a
            href="#download"
            onClick={() => props.showDownloadPopup(barn_id, cycle_id, cycles)}
          >
            Download
          </a>
        </div>
      </td>
    </tr>
  );
};
