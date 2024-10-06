import React from "react";
import { MdArrowLeft, MdArrowRight, MdRemoveCircle } from "react-icons/md";

const Product = ({ prod, quantity, setQuantity, onDelete }) => {
  return (
    <div className="flex flex-col md:flex-row w-full shadow-md dark:bg-darkGray justify-between p-2 rounded-xl font-karla gap-2 ">
      <div className="flex flex-col w-full gap-2 justify-between items-center md:items-baseline ">
        <div className="flex flex-col md:flex-row justify-between font-semibold w-full  md:text-lg px-2 gap-1   ">
          <div className="text-lg dark:text-primary-200 text-primary-300 font-semibold bg-darkGray dark:bg-mediumGray px-2 rounded-xl">
            {prod?.frame_code ? prod.frame_code : prod.lens_code}
          </div>
          <div>
            {prod?.frame_company ? prod.frame_company : prod.lens_category}
          </div>
          <div>{prod?.frame_type ? prod.frame_type : prod.lens_model}</div>
          <div>{prod?.frame_model ? prod.frame_model : null}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-lg  font-semibold md:flex md:w-full md:justify-center md:font-medium">
          <div>{prod?.spherical && <span>SPH : {prod.spherical}</span>}</div>
          <div>{prod?.cylinder && <span>CYL : {prod.cylinder}</span>}</div>
          <div>{prod?.axis && <span>AXIS : {prod.axis}</span>}</div>
          <div>{prod?.addition && <span>ADD : {prod.addition}</span>}</div>
        </div>
        <div className="text-2xl text-primary-300 font-bold px-4">
          Rs. {prod?.sales_price ? prod.sales_price : prod.sale_price}
        </div>
      </div>
      <div className="flex md:flex-col items-center justify-between">
        <div className="flex items-center justify-center text-lg">
          <span
            className="cursor-pointer"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            <MdArrowLeft />
          </span>
          <span className="text-xl">{quantity}</span>
          <span
            className="cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          >
            <MdArrowRight />
          </span>
        </div>
        <div
          className="text-2xl text-red-500 cursor-pointer"
          onClick={onDelete}
        >
          <MdRemoveCircle />
        </div>
      </div>
    </div>
  );
};

export default Product;
