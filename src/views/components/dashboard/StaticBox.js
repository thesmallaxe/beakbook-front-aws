import React from "react";

export const StaticBox = (props) => (
  <div className={"statics_box statics_box--" + props.color}>
    <span className="statics_box__logo">
      <i className={"icon " + props.logo}></i>
    </span>
    <h4 className="statics_box__text">{props.value}</h4>
    <label className="statics_box__label">{props.label}</label>
  </div>
);
