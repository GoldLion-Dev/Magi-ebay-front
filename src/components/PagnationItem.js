import { useState } from "react";

const PagnationItem = ({ i, keyNumber, number, handleClick }) => {
  return (
    <li key={keyNumber} id={i} number={number}>
      <a
        href="#"
        onClick={() => handleClick(i)}
        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {number}
      </a>
    </li>
  );
};

export default PagnationItem;
