import React, { useState } from "react";
import Customer from "./Customer";
import OrderProducts from "./OrderProducts";
import BillAmount from "./BillAmount";
import toast from "react-hot-toast";
import axios from "../../config/axios";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import Modal from "./Modal";
 
const NewOrder = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [customer, setCustomer] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [orderStatus, setOrderStatus] = useState("pending");
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOrder = async () => {
    const discount = 100 - (finalAmount / totalAmount) * 100;
    let formData = {
      customer_id: customer.customer_id,
      discount: discount,
      total: totalAmount,
      advance: advance,
      due: finalAmount - advance,
      order_status: orderStatus,
      products: [],
    };

    for (let i = 0; i < products.length; i++) {
      const frame_id = products[i]?.frame_code ? products[i].frame_code : null;
      const lens_id = products[i]?.lens_code ? products[i].lens_code : null;
      let data;
      if (frame_id) {
        const frame_quantity = quantities[i];
        data = {
          frame_id: frame_id,
          frame_quantity: frame_quantity,
        };
      }
      if (lens_id) {
        const lens_quantity = quantities[i];
        data = {
          lens_id: lens_id,
          lens_quantity: lens_quantity,
        };
      }

      formData.products.push(data);
    }

    try {
      const { data } = await axios.post("/orders/newOrder", formData);
      if (data.success) {
        console.log(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      const { data: customerDetails } = await axios.get(
        `/customers/customerByPhone/${query}`
      );
      if (customerDetails.success) {
        setCustomer(customerDetails.customer);
        setQuery("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const searchCustomer = (e) => {
    e.preventDefault();
    fetchCustomerDetails();
  };

  return (
    <div>
      <div className="flex border-b border-mediumGray py-4">
        <h1 className="text-xl md:text-2xl font-ubuntu font-bold">New Order</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between py-4">
        <form className="w-full flex gap-4 basis-3/4 font-karla">
          <input
            type="phoneNumber"
            placeholder="Search customer by Phone Number"
            className="shadow-md border-none focus:outline outline-primary-300 rounded-xl h-full p-4 bg-white dark:bg-darkGray w-full"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button
            type="submit"
            className="bg-primary-300 text-white px-6 py-4 rounded-xl text-lg md:text-xl shadow-sm"
            onClick={searchCustomer}
          >
            <FaSearch />
          </button>
        </form>
        <button
          className="flex items-center py-2 bg-white px-4 rounded-xl justify-between gap-4 shadow-md font-karla dark:bg-darkGray w-fit"
          onClick={() => setOpenModal(true)}
        >
          <FaUserPlus className="text-xl md:text-2xl text-primary-300" />
          <div className="bais-2/3 md:text-lg font-semibold">Add Customer</div>
        </button>
        {openModal && <Modal close={closeModal} />}
      </div>

      <div>
        <Customer customer={customer} />
      </div>
      {customer && (
        <div>
          <div className="flex flex-col md:flex-row justify-between py-4 gap-6  shadow-inner shadow-gray-400 dark:shadow-md   p-4 rounded-xl">
            <div className="w-full basis-2/3">
              <OrderProducts
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
                products={products}
                setProducts={setProducts}
                quantities={quantities}
                setQuantities={setQuantities}
              />
            </div>
            <div className="dark:bg-mediumGray  px-6 py-2 flex rounded-xl items-center justify-center shadow-md">
              <BillAmount
                totalAmount={totalAmount}
                finalAmount={finalAmount}
                setFinalAmount={setFinalAmount}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="py-4 flex items-center gap-2">
                <label htmlFor="orderStatus" className="text-lg">
                  Status :{" "}
                </label>
                <select
                  name="orderStatus"
                  id="orderStatus"
                  className="border-none focus:outline outline-primary-300  rounded-xl h-full p-2 bg-white dark:bg-darkGray"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="pending">PENDING</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
              <div className="py-4 flex items-center gap-2">
                <label htmlFor="advance" className="text-lg">
                  Advance :{" "}
                </label>
                <input
                  type="number"
                  placeholder="Enter advance amount"
                  id="advance"
                  className="border-none focus:outline outline-primary-300  rounded-xl h-full px-4 py-2 bg-white dark:bg-darkGray "
                  value={advance}
                  onChange={(e) => setAdvance(e.target.value)}
                />
              </div>
              <div className="py-4 flex items-center gap-2">
                <label htmlFor="remainAmount" className="text-lg">
                  Due:{" "}
                </label>
                <div className="text-2xl bg-white dark:bg-darkGray px-4 py-2  text-primary-300 font-semibold rounded-xl">
                  {finalAmount - advance}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-primary-300 px-4 py-2 text-lg rounded-xl font-bold"
                type="submit"
                onClick={handleOrder}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
