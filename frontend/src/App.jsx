import React from "react";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />

      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
