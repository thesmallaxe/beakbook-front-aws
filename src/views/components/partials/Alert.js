import React from "react";

const Alert = ({ action, label, message }) => {
  return (
    <div className={"alert alert--" + action}>
      {label && <label className="alert__label">{label}</label>}
      <p className="alert__text">{message}</p>
    </div>
  );
};

export default Alert;
