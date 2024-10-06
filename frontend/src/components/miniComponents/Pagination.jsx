import React, { useEffect, useRef, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, totalItems, itemsPerPage, pagination }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const scrollRef = useRef(null);

  const scrollBehaviourClick = (object) => {
    setTimeout(() => {
      object.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const numbers = [];
    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }

    setPageNumbers(numbers);
  }, [currentPage, totalItems, itemsPerPage]);

  return (
    <div
      className="flex items-center justify-center space-x-2 py-2"
      ref={scrollRef}
      onClick={() => scrollBehaviourClick(scrollRef)}
    >
      {currentPage > 1 && (
        <div
          className="cursor-pointer px-2 py-2 rounded-md bg-gray-200 dark:text-white dark:bg-darkGray"
          onClick={() => pagination(currentPage - 1)}
        >
          <MdArrowLeft className="text-lg " />
        </div>
      )}

      {pageNumbers.map((page) => (
        <div
          key={page}
          className={`${
            currentPage === page
              ? "bg-primary-300"
              : "bg-gray-200 dark:bg-darkGray"
          } cursor-pointer px-2 py-1 rounded-md `}
          onClick={() => {
            pagination(page);
          }}
        >
          {page}
        </div>
      ))}

      {currentPage < Math.ceil(totalItems / itemsPerPage) && (
        <div
          className="cursor-pointer px-2 py-2 rounded-md bg-gray-200 dark:bg-darkGray"
          onClick={() => pagination(currentPage + 1)}
        >
          <MdArrowRight className="text-lg" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
