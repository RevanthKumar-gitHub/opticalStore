import React, { useState } from "react";
import {
  generateAxis,
  lensCategory,
  lensModels,
  lensTypes,
} from "../../data/lens";
import SightInput from "./SightInput";
import toast from "react-hot-toast";
import axios from "../../config/axios";

const AddLens = ({ scrollToRef }) => {
  const axis = generateAxis();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    lens_model: "",
    lens_type: "",
    lens_category: "",
    spherical: "0.00",
    cylinder: "0.00",
    axis: 0,
    addition: "0.00",
    quantity: "",
    purchase_price: "",
    sales_price: "",
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
      const { data } = await axios.post("lens/addLens", formData);
      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
        setFormData({
          lens_model: "",
          lens_type: "",
          lens_category: "",
          spherical: "",
          cylinder: "",
          axis: 0,
          addition: "",
          quantity: "",
          purchase_price: "",
          sales_price: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col gap-2" ref={scrollToRef}>
      <div className="flex border-b border-mediumGray py-4">
        <h1 className="text-xl md:text-2xl font-ubuntu font-bold">Add Lens</h1>
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
                value={formData.lens_model}
                onChange={(e) =>
                  setFormData({ ...formData, lens_model: e.target.value })
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
                value={formData.lens_type}
                onChange={(e) =>
                  setFormData({ ...formData, lens_type: e.target.value })
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
                value={formData.lens_category}
                onChange={(e) =>
                  setFormData({ ...formData, lens_category: e.target.value })
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
              <label htmlFor="spherical" className="text-lg  font-semibold">
                SPH
              </label>
              <SightInput
                id={"spherical"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
                value={"0.00"}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="cylinder" className="text-lg  font-semibold">
                CYL
              </label>
              <SightInput
                id={"cylinder"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
                value={"0.00"}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="addition" className="text-lg  font-semibold">
                ADD
              </label>
              <SightInput
                id={"addition"}
                sendData={handleSightInputChange}
                submitted={submitted}
                setSubmitted={setSubmitted}
                value={"0.00"}
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
                value={formData.axis}
                onChange={(e) =>
                  setFormData({ ...formData, axis: e.target.value })
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
                type="number"
                name="salePrice"
                id="salePrice"
                className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-4 bg-white dark:bg-darkGray"
                placeholder="Enter Product Price"
                value={formData.sales_price}
                onChange={(e) =>
                  setFormData({ ...formData, sales_price: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-fit bg-primary-300 px-4 py-2 h-fit rounded-lg text-white text-lg font-semibold"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLens;
