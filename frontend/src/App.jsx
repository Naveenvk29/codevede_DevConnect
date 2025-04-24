import React from "react";

import { ToastContainer } from "react-toastify";

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />

      <Outlet />
    </>
  );
};

export default App;
