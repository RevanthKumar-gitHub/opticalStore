import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "../../config/axios";
import toast from "react-hot-toast";

const Modal = ({ close }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    phoneNumber: "",
    city: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: customerData } = await axios.post(
        "/customers/createCustomer",
        formData
      );
      if (customerData.success) {
        toast.success(customerData.message);
        close();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,0.4)] z-[1000]">
      <div className="relative h-[80%] w-[70%] dark:bg-gray-900 bg-lightGray rounded-xl px-2 md:px-12 py-4 shadow-md ">
        <div
          className="flex items-between w-full justify-end text-2xl text-black dark:text-white cursor-pointer"
          onClick={close}
        >
          <MdClose />
        </div>

        <form className="font-karla grid grid-cols-1 md:grid-cols-1 gap-4 h-full place-content-center  p-4 w-full">
          <div className="text-xl font-ubuntu font-bold">Add Customer</div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="customerName" className="md:text-lg font-semibold">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              id="customerName"
              name="customer_name"
              className="border-none focus:outline outline-primary-300 rounded-xl h-full p-4 bg-white dark:bg-darkGray shadow-md "
              onChange={handleInputChange}
              value={formData.customer_name}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="phoneNumber" className="md:text-lg font-semibold">
              Phone Number
            </label>
            <input
              type="phoneNumber"
              placeholder="Enter customer Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              className="border-none focus:outline outline-primary-300 rounded-xl h-full p-4 bg-white dark:bg-darkGray shadow-md"
              onChange={handleInputChange}
              value={formData.phoneNumber}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="city" className="md:text-lg font-semibold">
              City
            </label>
            <input
              type="text"
              placeholder="Enter customer city"
              id="city"
              name="city"
              className="border-none focus:outline outline-primary-300 rounded-xl h-full p-4 bg-white dark:bg-darkGray shadow-md"
              onChange={handleInputChange}
              value={formData.city}
            />
          </div>
          <button
            type="submit"
            className="w-fit bg-primary-300 px-4 py-2 h-fit rounded-lg text-white md:text-lg font-semibold"
            onClick={handleSubmit}
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
