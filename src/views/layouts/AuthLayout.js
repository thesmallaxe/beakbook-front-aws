import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthLayout = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (auth.is_logged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <main className="auth">
      <section className="auth__wrapper">
        <div className="auth__content">
          <Link to="/" className="auth__content__logo">
            <img src="/assets/img/logo.svg" alt="Logo" />
          </Link>
          <Outlet />
        </div>
        <div className="auth__image">
          <figure>
            <img
              src="/assets/img/login_image.png"
              alt="The Place where you can get all the info of your scales and
                barns"
            />
            <figcaption>
              <label>
                Welcome To <abbr>BeakBook</abbr>
              </label>
              <p>
                The place where you can get all the information for your scales
                and barns
              </p>
            </figcaption>
          </figure>
        </div>
        <div className="auth__login">
          <Link to="/" className="auth__login__logo">
            <img src="/assets/img/logo.svg" alt="Logo" />
          </Link>
        </div>
      </section>
    </main>
  );
};
