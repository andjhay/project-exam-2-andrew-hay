import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

/**
 * Layout component that contains header, footer and routed outlet to display components in the page directory.
 */
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
