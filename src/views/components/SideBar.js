import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "./partials/Menu";

const SideBar = ({ user }) => {
  const handleClose = () => {
    let main = document.getElementsByTagName("main");
    let side_bar = document.getElementsByClassName("sidebar");
    main[0].className = "menu-close";
    side_bar[0].className = "sidebar";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__scollable">
        <div className="sidebar__close">
          <button className="sidebar__close__btn" onClick={handleClose}>
            <i className="icon icon-add icon-rotate-45"></i>
          </button>
        </div>
        <div className="sidebar__logo">
          <figure>
            <Link to="/">
              <img src="/assets/img/logo.svg" alt="Logo" />
            </Link>
          </figure>
        </div>
        <div className="sidebar__nav_wrapper">
          <nav className="sidebar__nav">
            <Menu></Menu>
          </nav>
        </div>
        <div className="sidebar__auth">
          <Link to="/" className="sidebar__auth_link">
            <div className="sidebar__profile_pic">
              <img src="/assets/img/avatar.png" alt="Profile" />
            </div>
            <div className="sidebar__profile">
              <h4>{user.name}</h4>
              <span>{user.roles[0].name}</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
