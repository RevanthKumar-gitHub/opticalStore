import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import NewOrder from "../miniComponents/NewOrder";

const Orders = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [order, setOrder] = useState("");
  const scrollRef = useRef(null);

  const scrollOnClick = (object) => {
    setTimeout(() => {
      object.current.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container py-6 min-h-[84vh] md:min-h-[90vh] bg-lightGray dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-end border-b border-gray-400 pb-4">
        <h1 className="text-xl md:text-2xl font-bold font-ubuntu">Orders</h1>
        <div className="font-semibold">
          <Link to={"/"} className="text-primary-300">
            Dashboard{" "}
          </Link>
          / Orders
        </div>
      </div>
      <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="bg-white dark:bg-mediumGray w-full px-4 md:px-8 py-4 cursor-pointer rounded-xl flex items-center font-ubuntu justify-between shadow-sm"
          onClick={() => {
            setOrder("newOrder");
            scrollOnClick(scrollRef);
          }}
        >
          <FaPlus className="text-4xl md:text-6xl text-primary-300" />
          <div className="text-lg md:text-xl font-bold basis-2/3 text-end">
            {" "}
            New Order
          </div>
        </div>
      </div>
      <div ref={scrollRef}>{order === "newOrder" ? <NewOrder /> : null}</div>
    </div>
  );
};

export default Orders;
