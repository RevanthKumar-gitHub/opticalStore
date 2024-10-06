import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "../../config/axios";
import toast from "react-hot-toast";
import Product from "./Product";

const OrderProducts = ({
  totalAmount,
  setTotalAmount,
  products,
  setProducts,
  quantities,
  setQuantities,
}) => {
  const [query, setQuery] = useState("");

  const searchProducts = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/frames/getProduct/${query}`);
      if (data.success) {
        const newProducts = [...products, data.product[0]];
        const newQuantities = [...quantities, 1]; // default quantity is 1
        setProducts(newProducts);
        setQuantities(newQuantities);
        const productPrice = data.product[0]?.sales_price
          ? data.product[0].sales_price
          : data.product[0].sale_price;
        setTotalAmount((totalAmount) => totalAmount + productPrice);
        setQuery("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
    calculateTotalAmount(newQuantities, products);
  };

  const calculateTotalAmount = (quantities, products) => {
    let amount = 0;
    for (let i = 0; i < quantities.length; i++) {
      const productPrice = products[i]?.sales_price
        ? products[i].sales_price
        : products[i].sale_price;
      amount += quantities[i] * productPrice;
    }
    setTotalAmount(amount);
  };

  const handleDelete = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setProducts(newProducts);
    setQuantities(newQuantities);
    calculateTotalAmount(newQuantities, newProducts);
  };

  return (
    <div className="w-full">
      <form className="w-full flex gap-4 font-karla" onSubmit={searchProducts}>
        <input
          type="text"
          placeholder="Enter Products Id"
          className="shadow-md border-none focus:outline-none outline-primary-300 rounded-xl h-full p-4 bg-white dark:bg-darkGray w-full"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button
          type="submit"
          className="bg-primary-300 text-white px-6 py-4 rounded-xl text-lg md:text-xl shadow-sm"
        >
          <FaSearch />
        </button>
      </form>
      <div className="flex flex-col gap-2 py-2 dark:text-white">
        {products.map((prod, index) => (
          <Product
            key={index}
            prod={prod}
            quantity={quantities[index]}
            setQuantity={(newQuantity) =>
              handleQuantityChange(index, newQuantity)
            }
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;
