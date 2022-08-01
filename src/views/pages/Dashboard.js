import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchDashboardData } from "../../app/actions/DashboardActions";
import { ShimmerThumbnail } from "react-shimmer-effects";
import StaticBox from "../components/dashboard/StaticBox";
import { formatNumber } from "../../app/services/Helper";
import Header from "../components/Header";
import FavouriteBarns from "../components/dashboard/FavouriteBarns";
import { checkPermission } from "../../app/hooks/with-permission";

const Dashboard = (props) => {
  const { getData, favourite_barns, stats, loading, user } = props;
  const location = useLocation();

  useEffect(() => {
    getData();
  }, [getData]);

  const barns = favourite_barns;
  const statisticts = stats;
  const colors = ["blue", "green", "pink", "purple", "violet", "navy"];
  const box_colors = ["blue", "orange", "green"];

  return (
    <div className="container--fluid">
      <Header />
      <div className="container--dashboard">
        <div className="dashboard__welcome">
          <h3 className="dashboard__welcome_title">
            Hello, <strong>{user?.name ?? "User"}</strong>
          </h3>
          <div className="dashboard__welcome_block">
            <p className="dashboard__welcome_text">
              <span className="muted_text">Welcome to your dashboard,</span>{" "}
              here is an overview of your favorite{" "}
              <span className="highlight">barns.</span>
            </p>
            {checkPermission("view-barn") && (
              <Link className="dashboard__welcome_link" to="/barns">
                View All Barns
              </Link>
            )}
          </div>
        </div>
        <section className="dashboard">
          <div className="dashboard__overview">
            <div className="dashboard__starred">
              {loading && (
                <div className="dashboard__barns">
                  {Array.from({ length: 5 }, (value, key) => (
                    <ShimmerThumbnail key={key} height={300} rounded />
                  ))}
                </div>
              )}
              {!loading && barns && (
                <FavouriteBarns
                  barns={barns}
                  colors={colors}
                  location={location}
                />
              )}
            </div>
          </div>
          <div className="dashboard__statics">
            <div className="dashboard__statics_wrapper">
              {loading && (
                <div>
                  {Array.from({ length: 3 }, (value, key) => (
                    <ShimmerThumbnail key={key} height={150} rounded />
                  ))}
                </div>
              )}

              {statisticts &&
                Object.keys(statisticts).map((key) => (
                  <StaticBox
                    key={key}
                    color={pickColor(key, box_colors)}
                    logo={pickIcon(key)}
                    label={statisticts[key].label}
                    value={formatNumber(statisticts[key].value)}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const pickIcon = (index) => {
  const icons = ["icon-chicken-lg", "icon-scale", "icon-shop"];
  const length = icons.length - 1;
  const id = index % ~length;
  return icons[id];
};

export const pickColor = (index, colors) => {
  const length = colors.length - 1;
  const id = index % ~length;
  return colors[id];
};

const mapStateToProps = (state) => {
  return {
    loading: state.dashboard.loading,
    favourite_barns: state.dashboard.favourite_barns,
    stats: state.dashboard.stats,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(fetchDashboardData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
