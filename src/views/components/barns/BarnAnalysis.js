import React from "react";
import { Widget } from "../partials/Widget";
import { withPermission } from "../../../app/hooks/with-permission";

const BarnAnalysis = (props) => {
  const barns = props.analysis;

  return (
    <Widget title="Barn Analysis">
      {barns &&
        barns.map((barn, index) => (
          <div className="widget__list_item" key={index}>
            <div className={"widget__icon_block " + pickColorClass(index)}>
              <i className={barn.icon}></i>
            </div>
            <div className="widget__text_block">
              <h4 className="widget__count">
                {barn.value} <small>{barn.unit}</small>
              </h4>
              <label className="widget__label">{barn.label}</label>
            </div>
          </div>
        ))}
    </Widget>
  );
};

const pickColorClass = (index) => {
  const colors = ["--blue", "--orange", "--gray", "--green"];
  const length = colors.length - 1;
  const id = index % ~length;
  return colors[id];
};

export default withPermission(BarnAnalysis, "view-all-barn-analysis");
