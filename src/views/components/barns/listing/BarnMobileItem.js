import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const BarnMobileItem = (props) => {
  const [fav, setFav] = useState(false);
  const location = useLocation();
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
    <div className="barns__item">
      <div className="barns__item__content">
        <div className="barns__head__left">
          <div className="barns__head__item">
            <Link key={barn_id} state={{ from: location }} to={url}>
              <label>Barn Name</label>
              <p>
                <strong>{barn.name}</strong>
              </p>
            </Link>
          </div>
          <div className="barns__head__item">
            <label>Farm</label>
            <p>{barn.farm}</p>
          </div>
          <div className="barns__head__item">
            <label>Mortality</label>
            <p>{barn.mortality}</p>
          </div>
        </div>
        <div className="barns__head__right">
          <div className="barns__head__item">
            <label>Weight</label>
            <p>
              {barn.weight}{" "}
              <abbr className={diffClass}>({barn.weight_diff})</abbr>
            </p>
          </div>
        </div>
      </div>
      <div className="barns__item__content">
        <div className="barns__head__left">
          <button
            className="btn btn--link"
            onClick={() => props.showRenamebarn(barn_id, barn.name)}
          >
            Rename the barn
          </button>
        </div>
        <div className="barns__head__right">
          <button
            className="btn btn--link btn--link--green"
            onClick={() => props.showDownloadPopup(barn_id, cycle_id, cycles)}
          >
            <i className="icon icon-download"></i> Download
          </button>
          <button
            onClick={!fav ? handleFavourite : handleFavouriteRemove}
            className={
              "add_favourite " +
              (!fav ? "add_favourite--not" : "add_favourite--add")
            }
          >
            <i
              className={
                "icon " + (!fav ? "icon-favourite" : "icon-favourite-alt")
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};
