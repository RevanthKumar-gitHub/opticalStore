import React, { useState } from "react";

import CustomerDetails from "./CustomerDetails";

import CustomerSight from "./CustomerSight";

const Customer = ({ customer }) => {
  return (
    <div>
      {customer && (
        <div className="flex gap-4 flex-col w-full  justify-between rounded-2xl ">
          <div className="w-full">
            <CustomerDetails customer={customer} />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <CustomerSight customer={customer} eye={"Right Eye"} />
            <CustomerSight customer={customer} eye={"Left Eye"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
