import React from "react";
import { NavLink } from "react-router-dom";

export const MenuItem = (props) => {
  const isActive = props.active ? "sidebar__item--active" : "";

  return (
    <li className={"sidebar__item " + isActive}>
      <NavLink
        className={({ isActive }) =>
          (isActive ? "active" : "inactive") + " sidebar__item_link"
        }
        to={props.to}
      >
        <i className={"icon " + props.className}></i>
        <span>{props.children}</span>
      </NavLink>
    </li>
  );
};
