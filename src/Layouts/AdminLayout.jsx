import React from 'react'
import Headerfordash from "../Components/Headerfordash";
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
   return (
    <>
      <Headerfordash/>
      <Outlet />
    </>
  );
};

export default AdminLayout