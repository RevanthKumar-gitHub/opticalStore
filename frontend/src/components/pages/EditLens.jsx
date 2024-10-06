import React, { useState } from "react";
import axios from "../../config/axios";
import {
  generateAxis,
  lensCategory,
  lensModels,
  lensTypes,
} from "../../data/lens";
import SightInput from "../miniComponents/SightInput";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditLens = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const axis = generateAxis();
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    new_lens_model: "",
    new_lens_type: "",
    new_lens_category: "",
    new_spherical: "",
    new_cylinder: "",
    new_axis: "",
    new_addition: "",
    new_quantity: "",
    new_purchase_price: "",
    new_sales_price: "",
  });

  const handleSightInputChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`lens/updateLens/${id}`, formData);
      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
        setFormData({
          new_lens_model: "",
          new_lens_type: "",
          new_lens_category: "",
          new_spherical: "",
          new_cylinder: "",
          new_axis: "",
          new_addition: "",
          new_quantity: "",
          new_purchase_price: "",
          new_sales_price: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex flex-col gap-2 container py-6 min-h-[84vh] md:min-h-[90vh] bg-lightGray dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-gray-400 pb-4 gap-4">
        <h1 className="text-xl md:text-2xl font-ubuntu font-bold">Edit Lens</h1>
        <div className="font-semibold">
          <Link to={"/"} className="text-primary-300">
            Dashboard{" "}
          </Link>
          <Link to={"/products"} className="text-primary-300">
            / Products{" "}
          </Link>
          <span>/ Edit Lens</span>
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <div className="font-karla grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="lensModel" className="text-lg  font-semibold">
                Lens Model
              </label>
              <select
                name="lensModel"
                id="lensModel"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                value={formData.new_lens_model}
                onChange={(e) =>
                  setFormData({ ...formData, new_lens_model: e.target.value })
                }
              >
                <option value={""} className="text-gray-400">
                  Choose Model
                </option>
                {lensModels.map((model, _) => {
                  return (
                    <option key={_} value={model}>
                      {model}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="lensType" className="text-lg  font-semibold">
                Lens Type
              </label>
              <select
                name="lensType"
                id="lensType"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                value={formData.new_lens_type}
                onChange={(e) =>
                  setFormData({ ...formData, new_lens_type: e.target.value })
                }
              >
                <option value={""} className="text-gray-400">
                  Choose Type
                </option>
                {lensTypes.map((type, _) => {
                  return (
                    <option key={_} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="lensCategory" className="text-lg  font-semibold">
                Lens Category
              </label>
              <select
                name="lensCategory"
                id="lensCategory"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                value={formData.new_lens_category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    new_lens_category: e.target.value,
                  })
                }
              >
                <option value={""} className="text-gray-400">
                  Choose Category
                </option>
                {lensCategory.map((category, _) => {
                  return (
                    <option key={_} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="new_spherical" className="text-lg  font-semibold">
                SPH
              </label>
              <SightInput
                id={"new_spherical"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="new_cylinder" className="text-lg  font-semibold">
                CYL
              </label>
              <SightInput
                id={"new_cylinder"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="new_addition" className="text-lg  font-semibold">
                ADD
              </label>
              <SightInput
                id={"new_addition"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="axis" className="text-lg  font-semibold">
                Axis
              </label>
              <select
                name="axis"
                id="axis"
                className="border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray scrollbar-custom"
                value={formData.new_axis}
                onChange={(e) =>
                  setFormData({ ...formData, new_axis: e.target.value })
                }
              >
                {axis.map((ax, _) => {
                  return (
                    <option key={_} value={ax}>
                      {ax}
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
                type="number"
                name="salePrice"
                id="salePrice"
                className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                placeholder="Enter Product Price"
                value={formData.new_sales_price}
                onChange={(e) =>
                  setFormData({ ...formData, new_sales_price: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit bg-primary-300 px-4 py-2 h-fit rounded-lg text-white text-lg font-semibold"
            onClick={handleSubmit}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLens;
