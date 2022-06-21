import React from "react";

export const BarnItem = (props) => {
  const barn = props.barn;
  const classNames = "dashboard__single barn barn--" + props.color;
  const weight = barn.cycleOverview.averageWeight
    ? barn.cycleOverview.averageWeight.toFixed(1)
    : 0;

  return (
    <div className={classNames}>
      <div className="barn__overview">
        <label className="barn__label">{barn.label}</label>
        <h2 className="barn__summary">
          {weight} <small>{barn.cycleOverview.averageWeightUnit}</small>
        </h2>
        <p className="barn__text">Average weight</p>
        <div className="barn__days">
          <i className="icon icon-calendar"></i>
          <span>
            {barn.cycleOverview.currentAge} {barn.cycleOverview.currentAgeUnit}
          </span>
        </div>
        <div className="barn__chicken">
          <i className="icon icon-chicken"></i>
          <span>
            {barn.cycleOverview.population} {barn.cycleOverview.breed}
          </span>
        </div>
      </div>
    </div>
  );
};
