import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActivePage,
  changeCountPerPage,
  previousPage,
  nextPage,
} from "../pages/listingSlice";
import PagnationItem from "./PagnationItem";

const TableFooter = ({ rowCount }) => {
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  let pageCount = Math.floor(rowCount / countPerPage);

  if (rowCount % countPerPage != 0) {
    pageCount += 1;
  }
  const dispatch = useDispatch();

  const handleSelectCountPerPage = (event) => {
    dispatch(changeCountPerPage(event.target.value));
  };

  const handlClickPagnationItem = (activePage) => {
    dispatch(changeActivePage(activePage));
  };

  const handleClickPrevious = () => {
    if (activePage > 1) {
      dispatch(previousPage());
    }
  };

  const handleClickNext = () => {
    if (activePage < pageCount) {
      dispatch(nextPage());
    }
  };

  const renderPageItem = (activeNumber) => {
    let pageItems = [];
    let threeDot = "...";

    if (pageCount <= 5) {
      ///1,2,3,4,5
      for (let i = 1; i <= pageCount; i++) {
        pageItems.push(
          <PagnationItem
            i={i}
            keyNumber={i}
            number={i}
            handleClick={handlClickPagnationItem}
          />
        );
      }
      return pageItems;
    }

    if (activeNumber - 3 < 1) {
      ///1,2,3,4 ...
      for (let i = 1; i <= 4; i++) {
        pageItems.push(
          <PagnationItem
            i={i}
            keyNumber={i}
            number={i}
            handleClick={handlClickPagnationItem}
          />
        );
      }
      pageItems.push(
        <PagnationItem
          i={5}
          keyNumber={5}
          number={threeDot}
          handleClick={handlClickPagnationItem}
        />
      );
      return pageItems;
    }

    if (activeNumber + 3 < pageCount && activeNumber - 3 >= 1) {
      ///...3,4,5,6...
      pageItems.push(
        <PagnationItem
          i={activeNumber - 2}
          keyNumber={1}
          number={threeDot}
          handleClick={handlClickPagnationItem}
        />
      );
      for (let i = 0; i <= 2; i++) {
        pageItems.push(
          <PagnationItem
            i={activeNumber - 1 + i}
            keyNumber={i + 2}
            number={activeNumber - 1 + i}
            handleClick={handlClickPagnationItem}
          />
        );
      }
      pageItems.push(
        <PagnationItem
          i={activeNumber + 2}
          keyNumber={5}
          number={threeDot}
          handleClick={handlClickPagnationItem}
        />
      );
      return pageItems;
    }

    if (activeNumber + 3 >= pageCount && activeNumber <= pageCount) {
      ///... 4,5,6,7
      pageItems.push(
        <PagnationItem
          i={pageCount - 4}
          keyNumber={1}
          number={threeDot}
          handleClick={handlClickPagnationItem}
        />
      );
      for (let i = 1; i <= 4; i++) {
        pageItems.push(
          <PagnationItem
            i={pageCount - 4 + i}
            keyNumber={i + 1}
            number={pageCount - 4 + i}
            handleClick={handlClickPagnationItem}
          />
        );
      }
      return pageItems;
    }
  };

  return (
    <section className="container sm:flex sm:justify-between">
      <div className="flex items-center justify-center px-10 py-5 sm:w-1/3">
        <label
          for="countries"
          className=" w-1/3  mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          アイテム数:
        </label>
        <select
          id="countries"
          className="sm:w-1/3 min-w-max w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={200}
          onChange={handleSelectCountPerPage}
        >
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
      </div>
      <div className="flex items-center justify-center  ">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center justify-center -space-x-px h-10 text-base">
            <li onClick={handleClickPrevious}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            {renderPageItem(activePage)}
            <li onClick={handleClickNext}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default TableFooter;
