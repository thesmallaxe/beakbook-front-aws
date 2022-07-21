import React from "react";
import { checkPermission } from "../../../app/hooks/with-permission";

const StaticBox = ({ label, value, color, logo }) => {
  const permissions = {
    total_chicken: "total-chicken-dashboard",
    active_scales: "total-scales-dashboard",
    registered_barns: "total-barns-dashboard",
  };

  const permission = label
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^\w-]+/g, "");

  const hasAccess = checkPermission(permissions[permission]);

  if (!hasAccess) {
    return <></>;
  }

  return (
    <div className={"statics_box statics_box--" + color}>
      <span className="statics_box__logo">
        <i className={"icon " + logo}></i>
      </span>
      <h4 className="statics_box__text">{value}</h4>
      <label className="statics_box__label">{label}</label>
    </div>
  );
};

export default StaticBox;
