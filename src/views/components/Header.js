import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkPermission } from "../../app/hooks/with-permission";

const Header = (props) => {
  const { back } = props;
  const location = useLocation();
  const [show, setShow] = useState(false);

  const toggleAuthMenu = () => {
    setShow(!show);
  };

  const toggleMenu = () => {
    let main = document.getElementsByTagName("main");
    let side_bar = document.getElementsByClassName("sidebar");
    main[0].className = "menu-open";
    side_bar[0].className = "sidebar active";
  };

  return (
    <header className="header">
      <div className="header__mobile">
        <div className="header__logo">
          <figure>
            <Link to="/">
              <img src="/assets/img/logo.svg" alt="Logo" />
            </Link>
          </figure>
        </div>
        <div className="header__menu">
          <div className="header__kebab">
            <button onClick={toggleMenu}>
              <i className="icon icon-menu"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="header__dekstop">
        <div className="header__left">
          {location.pathname !== "/" && (
            <Link className="btn btn--icon" to="/">
              <i className="icon icon-home"></i>
            </Link>
          )}

          {back && (
            <Link className="btn btn--white" to={back?.action ?? "/"}>
              <i className="icon icon-arrow-left"></i> {back?.label ?? "Back"}
            </Link>
          )}
        </div>
        <div className="header__right">
          <button
            className={
              "btn btn--icon btn--white btn--round profile__btn " +
              (show ? "active" : "")
            }
            onClick={toggleAuthMenu}
          >
            <i className="icon icon-user"></i>
          </button>
          <div className="profile__dropdown" id="profile__dropdown">
            <ul>
              <li>
                <Link to="/settings">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>

          {checkPermission("receive-notifications") && (
            <Link
              className="btn btn--icon btn--white btn--round btn--notification"
              to="/"
            >
              {/* <i className='icon icon-bell'></i> */}
              <img
                src="/assets/icons/notification-bell.png"
                alt="Notification"
              />
            </Link>
          )}

          {props.children}
        </div>
      </div>
    </header>
  );
};

export default Header;
