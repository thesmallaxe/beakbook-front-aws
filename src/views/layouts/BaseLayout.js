import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export const BaseLayout = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (!auth.is_logged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const animation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <main>
      <SideBar user={auth.user} />
      <div className="main-wrapper">
        <ToastContainer position="top-right" limit={1} />
        <motion.div
          variants={animation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </main>
  );
};
