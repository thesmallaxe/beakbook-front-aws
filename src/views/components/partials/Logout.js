import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../../app/actions/AuthActions";

function Logout({ logoutUser }) {
  const location = useLocation();

  localStorage.clear();
  sessionStorage.clear();

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
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
