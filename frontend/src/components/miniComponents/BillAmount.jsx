import React, { useEffect, useState } from "react";

const BillAmount = ({ totalAmount, finalAmount, setFinalAmount }) => {
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let newAmount = totalAmount - (discount * totalAmount) / 100;
    setFinalAmount(newAmount);
  }, [discount, totalAmount]);
  return (
    <div className="flex flex-col w-full justify-center  rounded-xl gap-4">
      <div className="text-2xl md:text-3xl  font-ubuntu font-bold">Bill</div>
      <div className="flex text-xl gap-4">
        <span className="font-karla font-semibold text-gray-700 dark:text-gray-200">
          Total Amount :{" "}
        </span>
        <span className="font-ubuntu font-bold">Rs. {totalAmount}</span>
      </div>
      <div className="flex md:flex-row flex-col md:items-center gap-4">
        <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">Discount : </span>
        <input
          type="number"
          id="Discount"
          placeholder="Enter Disconut in %"
          defaultValue={0}
          onChange={(e) => setDiscount(e.target.value)}
          className=" border-none focus:outline outline-primary-300  rounded-xl  p-2 bg-white dark:bg-darkGray"
        />
      </div>
      <div className="text-xl  flex gap-4 items-center">
        <span className="font-karla font-semibold text-gray-700 dark:text-gray-200">
          Final Amount :{" "}
        </span>
        <span className="font-ubuntu font-bold text-2xl ">Rs. {finalAmount}</span>
      </div>
    </div>
  );
};

export default BillAmount;
