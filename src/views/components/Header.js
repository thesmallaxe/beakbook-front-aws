import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
  const { back } = props;
  const location = useLocation();
  const [show, setShow] = useState(false);

  const toggleAuthMenu = () => {
    setShow(!show);
  };

  return (
    <header className="header">
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

        <Link
          className="btn btn--icon btn--white btn--round btn--notification"
          to="/"
        >
          {/* <i className='icon icon-bell'></i> */}
          <img src="/assets/icons/notification-bell.png" alt="Notification" />
        </Link>

        {props.children}
      </div>
    </header>
  );
};

export default Header;
