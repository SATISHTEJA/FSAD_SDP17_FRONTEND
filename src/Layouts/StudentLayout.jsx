import React from "react";
import { Outlet } from "react-router-dom";
import HeaderforStudent from "../Components/HeaderforStudent";

const StudentLayout = () => {
  return (
    <>
      <HeaderforStudent />
      <Outlet />
    </>
  );
};

export default StudentLayout;