import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaGlasses, FaPlus } from "react-icons/fa";
import { MdOutlineLens } from "react-icons/md";
import Frames from "../miniComponents/Frames";
import AddFrames from "../miniComponents/AddFrames";
import Lens from "../miniComponents/Lens";
import AddLens from "../miniComponents/AddLens";
import { useSelector } from "react-redux";

const Products = () => {
  const [product, setProduct] = useState("");
  const scrollToRef = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.user);

  const scrollBehaviourClick = (object) => {
    setTimeout(() => {
      object.current.scrollIntoView({ behavior: "smooth" });
    }, 100); // Adjust timeout as needed
  };

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [product]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container py-6 min-h-[84vh] md:min-h-[90vh] bg-lightGray dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-end border-b border-gray-400 pb-4">
        <h1 className="text-xl md:text-2xl font-bold font-ubuntu">Products</h1>
        <div className="font-semibold">
          <Link to={"/"} className="text-primary-300">
            Dashboard{" "}
          </Link>
          / Products
        </div>
      </div>
      <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => {
            setProduct("Frames");
            scrollBehaviourClick(scrollToRef);
          }}
          className="bg-white dark:bg-mediumGray w-full px-4 md:px-8 py-4 cursor-pointer rounded-xl flex items-center font-ubuntu justify-between shadow-sm"
        >
          <FaGlasses className="text-4xl md:text-6xl text-primary-300" />
          <div className="text-lg md:text-xl font-bold basis-2/3 text-end">
            Frames
          </div>
        </div>
        <div
          onClick={() => {
            setProduct("Add Frames");
            scrollBehaviourClick(scrollToRef);
          }}
          className="bg-white dark:bg-mediumGray w-full px-4 md:px-8 py-4 cursor-pointer rounded-xl flex items-center font-ubuntu justify-between shadow-sm"
        >
          <FaPlus className="text-4xl md:text-6xl text-primary-300" />
          <div className="text-lg md:text-xl font-bold basis-2/3 text-end">
            New Frames
          </div>
        </div>
        <div
          onClick={() => {
            setProduct("Lens");
            scrollBehaviourClick(scrollToRef);
          }}
          className="bg-white dark:bg-mediumGray w-full px-4 md:px-8 py-4 cursor-pointer rounded-xl flex items-center font-ubuntu justify-between shadow-sm"
        >
          <MdOutlineLens className="text-4xl md:text-6xl text-primary-300" />
          <div className="text-lg md:text-xl font-bold basis-2/3 text-end">
            Lens
          </div>
        </div>
        <div
          onClick={() => {
            setProduct("Add Lens");
            scrollBehaviourClick(scrollToRef);
          }}
          className="bg-white dark:bg-mediumGray w-full px-4 md:px-8 py-4 cursor-pointer rounded-xl flex items-center font-ubuntu justify-between shadow-sm"
        >
          <FaPlus className="text-4xl md:text-6xl text-primary-300" />
          <div className="text-lg md:text-xl font-bold basis-2/3 text-end">
            New Lens
          </div>
        </div>
      </div>

      {product === "Frames" ? (
        <Frames scrollToRef={scrollToRef} />
      ) : product === "Add Frames" ? (
        <AddFrames scrollToRef={scrollToRef} />
      ) : product === "Lens" ? (
        <Lens scrollToRef={scrollToRef} />
      ) : product === "Add Lens" ? (
        <AddLens scrollToRef={scrollToRef} />
      ) : null}
    </div>
  );
};

export default Products;
