import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import axios from "../../config/axios";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const Frames = ({ scrollToRef }) => {
  const [frames, setFrames] = useState([]);
  const [search, setSearch] = useState("");
  const [limitedFrames, setLimitedFrames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchFrames = async () => {
    try {
      const { data } = await axios.get("/frames/allFrames");
      setFrames(data.frames);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const limitFrames = () => {
    //filter by search
    const filterFrames = frames.filter((frame) =>
      frame.frame_code.includes(search)
    );
    //limit frames
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = filterFrames.slice(firstIndex, lastIndex);
    setLimitedFrames(currentItems);
  };

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/frames/deleteFrames/${id}`);
      if (data.success) {
        toast.success(data.message);
        const changedItems = frames.filter((frame) => frame.frame_code !== id);
        setFrames(changedItems);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchFrames();
  }, []);

  useEffect(() => {
    limitFrames();
  }, [search, frames, currentPage, itemsPerPage]);

  return (
    <div ref={scrollToRef}>
      <div className="text-xl md:text-2xl font-ubuntu font-bold border-b border-mediumGray py-4">
        <h1>Frames List</h1>
      </div>
      <div className="py-4 flex md:items-center flex-col md:flex-row gap-2">
        <div className="relative w-full flex items-center overflow-hidden bg-white rounded-xl px-4 dark:bg-darkGray shadow-sm">
          <div className="absolute right-0 px-4 text-3xl text-primary-300">
            <MdSearch />
          </div>
          <input
            type="text"
            placeholder="Search by Frame Code"
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
                Frame Code
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Frame Company
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Frame Type
              </th>
              <th className="py-4 border-r border-primary-200 px-8">
                Frame Model
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
            {limitedFrames.map((frame, _) => {
              return (
                <tr
                  key={_}
                  className="text-center border-b border-primary-200  "
                >
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.frame_code}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.frame_company}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.frame_type}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.frame_model}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.quantity}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.purchase_price}
                  </td>
                  <td className="py-2 text-mediumGray dark:text-gray-100">
                    {frame.sale_price}
                  </td>
                  <td className="py-4 text-mediumGray dark:text-gray-100 flex justify-center gap-4 text-lg md:text-xl cursor-pointer">
                    <MdEdit
                      className="text-blue-600"
                      onClick={() => navigate(`editFrame/${frame.frame_code}`)}
                    />
                    <MdDelete
                      className="text-red-600"
                      onClick={() => deleteProduct(frame.frame_code)}
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
          totalItems={frames.length}
          itemsPerPage={itemsPerPage}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default Frames;
