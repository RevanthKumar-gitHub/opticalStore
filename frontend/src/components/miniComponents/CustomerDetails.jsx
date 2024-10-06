const CustomerDetails = ({ customer }) => {
  return (
    customer && (
      <div className="flex flex-col md:flex-row justify-between bg-white dark:bg-darkGray w-full p-4 rounded-xl shadow-md font-karla text-lg">
        <div className="capitalize font-semibold">
          <span className="text-gray-600 dark:text-gray-400">
            Customer Name :{" "}
          </span>
          {customer.customer_name}
        </div>
        <div className="capitalize font-semibold">
          <span className="text-gray-600 dark:text-gray-400">
            Phone Number :{" "}
          </span>
          {customer.phonenumber}
        </div>
        <div className=" capitalize font-semibold">
          <span className="text-gray-600 dark:text-gray-400">City : </span>
          {customer.city}
        </div>
      </div>
    )
  );
};

export default CustomerDetails;
