import React from "react";
import { Outlet } from "react-router-dom";
import MiniDrawerRoutingLeftNavBar from "../MaterialUi/MiniDrawerRoutingLeftNavBar";

const ContentRenderOutLet = () => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MiniDrawerRoutingLeftNavBar />
        <div style={{ marginTop: "100px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ContentRenderOutLet;
