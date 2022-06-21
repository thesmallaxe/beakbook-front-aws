import React from "react";
import { connect } from "react-redux";

export const Alerts = (props) => {
  return (
    <div className="container">
      <div className="alerts">
        <p>Feature under development.</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
