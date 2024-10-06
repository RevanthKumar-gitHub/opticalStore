import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { frameModels, frameTypes } from "../../data/frames";
import axios from "../../config/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const EditFrame = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_frame_company: "",
    new_frame_type: "",
    new_frame_model: "",
    new_quantity: "",
    new_purchase_price: "",
    new_sale_price: "",
  });

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/frames/updateFrames/${id}`, formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/products");
      }
    } catch (error) {
      toast.error(error.response.data, message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container py-4 dark:bg-gray-900 min-h-[90vh] dark:text-white bg-lightGray">
      <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-gray-400 pb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-bold font-ubuntu">
          Edit Frames
        </h1>
        <div className="font-semibold">
          <Link to={"/"} className="text-primary-300">
            Dashboard{" "}
          </Link>
          <Link to={"/products"} className="text-primary-300">
            / Products{" "}
          </Link>
          <span>/ Edit Frame</span>
        </div>
      </div>
      <div>
        <div className="p-2">
          <form className="font-karla grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="frameCompany" className="text-lg  font-semibold">
                Frame Company
              </label>
              <input
                type="text"
                name="frameCompany"
                id="frameCompany"
                className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                placeholder="Enter Frame Company"
                value={formData.new_frame_company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    new_frame_company: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="frameType"
                className="text-lg md:text-xl font-semibold"
              >
                Frame Type
              </label>
              <select
                name="frameType"
                id="frameType"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                value={formData.new_frame_type}
                onChange={(e) =>
                  setFormData({ ...formData, new_frame_type: e.target.value })
                }
              >
                <option value={""} className="text-gray-400">
                  Choose Type
                </option>
                {frameTypes.map((type, _) => {
                  return (
                    <option key={_} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="frameModel" className="text-lg  font-semibold">
                Frame Model
              </label>
              <select
                name="frameModel"
                id="frameModel"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                value={formData.new_frame_model}
                onChange={(e) =>
                  setFormData({ ...formData, new_frame_model: e.target.value })
                }
              >
                <option value={""} className="text-gray-400">
                  Choose Model
                </option>
                {frameModels.map((model, _) => {
                  return (
                    <option key={_} value={model}>
                      {model}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="quantity" className="text-lg  font-semibold">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                placeholder="Enter Quantity"
                value={formData.new_quantity}
                onChange={(e) =>
                  setFormData({ ...formData, new_quantity: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="purchasePrice" className="text-lg  font-semibold">
                Product Cost
              </label>
              <input
                type="number"
                name="purchasePrice"
                id="purchasePrice"
                className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                placeholder="Enter Product Cost"
                value={formData.new_purchase_price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    new_purchase_price: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="salePrice" className="text-lg  font-semibold">
                Product Price
              </label>
              <input
                type="text"
                name="salePrice"
                id="salePrice"
                className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                placeholder="Enter Product Price"
                value={formData.sale_price}
                onChange={(e) =>
                  setFormData({ ...formData, new_sale_price: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-fit bg-primary-300 px-4 py-2 rounded-lg text-white text-lg font-semibold"
              onClick={handleSubmit}
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFrame;
