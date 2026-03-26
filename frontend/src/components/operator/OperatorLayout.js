import React from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const OperatorLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <TopNavbar />
        {children}
      </div>
    </div>
  );
};

export default OperatorLayout;
