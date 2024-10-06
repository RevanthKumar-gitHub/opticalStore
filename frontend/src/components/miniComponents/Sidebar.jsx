import React, { useState } from "react";
import { useSelector } from "react-redux";
import {} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RxBox, RxPlus } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();
  const { menu } = useSelector((state) => state.theme);
  return (
    <div
      className={`${
        pathname !== "/login" && menu ? "flex" : "hidden"
      } flex-col gap-4 bg-darkGray text-white px-8 pt-[18vh] md:pt-[12vh]  h-screen  top-0 left-0 sidebar-custom font-ubuntu fixed z-10`}
    >
      <Link
        to={"/"}
        className={`${
          pathname === "/" ? "bg-primary-300" : ""
        } text-lg md:text-xl bg-mediumGray px-2 md:px-4 py-2 rounded-xl cursor-pointer hover:bg-primary-300 duration-300`}
      >
        <MdOutlineDashboard className="text-xl md:text-2xl" />
        <span>Dashboard</span>
      </Link>
      <Link
        to={"/products"}
        className={`${
          pathname === "/products" ? "bg-primary-300" : ""
        } text-lg md:text-xl bg-mediumGray px-2 md:px-4 py-2 rounded-xl cursor-pointer hover:bg-primary-300 duration-300`}
      >
        <RxBox className="text-xl md:text-2xl" />
        <span>Products</span>
      </Link>
      <Link
        to={"/orders"}
        className={`${
          pathname === "/orders" ? "bg-primary-300" : ""
        } text-lg md:text-xl bg-mediumGray px-2 md:px-4 py-2 rounded-xl cursor-pointer hover:bg-primary-300 duration-300`}
      >
        <RxPlus className="text-xl md:text-2xl" />
        <span>Orders</span>
      </Link>
    </div>
  );
};

export default Sidebar;
