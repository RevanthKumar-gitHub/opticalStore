import React, { useState } from "react";
import { frameModels, frameTypes } from "../../data/frames";
import toast from "react-hot-toast";
import axios from "../../config/axios";

const AddFrames = ({scrollToRef}) => {
  const [formData, setFormData] = useState({
    frame_company: "",
    frame_type: "",
    frame_model: "",
    quantity: "",
    purchase_price: "",
    sale_price: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/frames/addFrames", formData);
      if (data.success) {
        toast.success(data.message);
        setFormData({
          frame_company: "",
          frame_type: "",
          frame_model: "",
          quantity: "",
          purchase_price: "",
          sale_price: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div ref={scrollToRef}>
      <div className="flex border-b border-mediumGray py-4 ">
        <h1 className="text-xl md:text-2xl font-ubuntu font-bold">
          Add Frames
        </h1>
      </div>
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
              value={formData.frame_company}
              onChange={(e) =>
                setFormData({ ...formData, frame_company: e.target.value })
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
              value={formData.frame_type}
              onChange={(e) =>
                setFormData({ ...formData, frame_type: e.target.value })
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
              value={formData.frame_model}
              onChange={(e) =>
                setFormData({ ...formData, frame_model: e.target.value })
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
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
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
              value={formData.purchase_price}
              onChange={(e) =>
                setFormData({ ...formData, purchase_price: e.target.value })
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
                setFormData({ ...formData, sale_price: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-fit bg-primary-300 px-4 py-2 rounded-lg text-white text-lg font-semibold"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFrames;
