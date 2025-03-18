import React from "react";
import Sidebar from "../components/layouts/Sidebar";
import '../style/defaultlayout.css'

const DefaultLayout = ({ children,hideSidebar }) => {
  return (
    <div className={`container-fluid ${hideSidebar ? 'no-sidebar' : ''}`}>
    <div className="row flex-nowrap">
      {!hideSidebar && <Sidebar />}
      <main className={`col py-3 ${hideSidebar ? 'full-width' : ''}`}>
        {children}
      </main>
    </div>
  </div>
  );
};

export default DefaultLayout;
