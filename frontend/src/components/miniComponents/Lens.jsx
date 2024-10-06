import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from "react-hot-toast";
import Pagination from "./Pagination";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";

const Lens = ({ scrollToRef }) => {
  const [lens, setLens] = useState([]);
  const [search, setSearch] = useState("");
  const [limitedLens, setLimitedLens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchLens = async () => {
    try {
      const { data } = await axios.get("/lens/allLens");
      if (data.success) {
        setLens(data.lens);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const limitLens = () => {
    //filter by search
    const filterLens = lens.filter((len) => len.lens_code.includes(search));
    //limit frames
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = filterLens.slice(firstIndex, lastIndex);
    setLimitedLens(currentItems);
  };

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/lens/deleteLens/${id}`);
      if (data.success) {
        toast.success(data.message);
        const changedItems = lens.filter((len) => len.lens_code !== id);
        setLens(changedItems);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchLens();
  }, [lens]);

  useEffect(() => {
    limitLens();
  }, [search, lens, currentPage, itemsPerPage]);

  return (
    <div ref={scrollToRef}>
      <div className="text-xl md:text-2xl font-ubuntu font-bold border-b border-mediumGray py-4">
        <h1>Lens List</h1>
      </div>
      <div className="py-4 flex md:items-center flex-col md:flex-row gap-2">
        <div className="relative w-full flex items-center overflow-hidden bg-white rounded-xl px-4 dark:bg-darkGray shadow-sm">
          <div className="absolute right-0 px-4 text-3xl text-primary-300">
            <MdSearch />
          </div>
          <input
            type="text"
            placeholder="Search by Lens Code"
            className="p-4 rounded-xl overflow-hidden outline-none dark:bg-darkGray w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div>{/* buttons */}</div>
      </div>
      <div className="overflow-auto ">
        <table className="w-full bg-white dark:bg-darkGray rounded-xl  shadow-sm overflow-hidden">
          <thead>
            <tr className="text-md font-karla border-b border-primary-200 ">
              <th className="py-4 border-r  border-primary-200 px-8">
                Lens Code
              </th>
              <th className="py-4 border-r border-primary-200 px-8">SPH</th>
              <th className="py-4 border-r border-primary-200 px-8">CYL</th>
              <th className="py-4 border-r border-primary-200 px-8">AXIS</th>
              <th className="py-4 border-r border-primary-200 px-8">ADD</th>
              <th className="py-4 border-r border-primary-200 px-8">
                Lens Type
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Lens Model
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Lens Category
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Quantity
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Product Cost
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Product Price
              </th>
              <th className="py-4 px-8">Action</th>
            </tr>
          </thead>
          <tbody>
            {limitedLens.map((len, _) => {
              return (
                <tr
                  key={_}
                  className="text-center border-b border-primary-200  "
                >
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.lens_code}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.spherical > 0 ? (
                      <span>+ {len.spherical}</span>
                    ) : (
                      len.spherical
                    )}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.cylinder > 0 ? (
                      <span>+ {len.cylinder}</span>
                    ) : (
                      len.cylinder
                    )}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.axis}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.addition > 0 ? (
                      <span>+ {len.addition}</span>
                    ) : (
                      len.addition
                    )}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.lens_type}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.lens_model}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.lens_category}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.quantity}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.purchase_price}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {len.sales_price}
                  </td>
                  <td className="py-4 text-mediumGray dark:text-gray-100 flex justify-center gap-4 text-lg md:text-xl cursor-pointer">
                    <MdEdit
                      className="text-blue-600"
                      onClick={() => navigate(`editLens/${len.lens_code}`)}
                    />
                    <MdDelete
                      className="text-red-600"
                      onClick={() => deleteProduct(len.lens_code)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center gap-4 px-4 py-4 flex-col md:flex-row">
        <div className="flex gap-2 items-center font-karla">
          <label htmlFor="ItemsPerPage" className="font-semibold">
            Set Items per page
          </label>
          <select
            name="ItemsPerPage"
            id="ItemsPerPage"
            className=" border-none focus:outline outline-primary-300  rounded-xl h-full p-2 bg-white dark:bg-darkGray"
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={lens.length}
          itemsPerPage={itemsPerPage}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default Lens;
