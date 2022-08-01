import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../../../app/actions/AuthActions";

function Logout({ logoutUser, user }) {
  const location = useLocation();
  const [logout, setLogout] = useState(true);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  useEffect(() => {
    if (!user.is_logged) {
      setLogout(false);
    }
  }, [user]);

  return logout ? (
    <p>Redirecting...</p>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
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
