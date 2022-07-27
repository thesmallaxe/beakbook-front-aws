import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../../../app/actions/AuthActions";

function Logout({ logoutUser }) {
  const location = useLocation();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/login" state={{ from: location }} replace />;
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
