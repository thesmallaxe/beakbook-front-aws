import { Link } from "react-router-dom";
import { BarnItem } from "./BarnItem";
import { pickColor } from "../../pages/Dashboard";
import { withPermission } from "../../../app/hooks/with-permission";

const FavouriteBarns = ({ barns, colors, location }) => {
  return (
    <div className="dashboard__barns">
      {Object.keys(barns).map((key) => (
        <Link
          key={key}
          state={{ from: location }}
          to={"/barns/" + barns[key].barnId + "/cycle/" + barns[key].cycleId}
        >
          <BarnItem barn={barns[key]} color={pickColor(key, colors)} />
        </Link>
      ))}
    </div>
  );
};

export default withPermission(FavouriteBarns, "farm-dashboard");
