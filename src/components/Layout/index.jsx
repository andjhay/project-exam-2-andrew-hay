import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
