import { React, useState, useRef, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setShowToastForReList, setResultStatus } from "../pages/editSlice";

const AllEditModal = ({ data }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  let tempObject = {};
  data.map((item) => {
    tempObject = {
      ...tempObject,
      [item.id]: item.title,
    };
  });
  const [inputs, setInput] = useState(tempObject);
  //   const api_root = process.env.REACT_APP_API_ROOT;
  //   const submitElement = useRef();

  //   const [inputs, setInputs] = useState({
  //     title: item.title,
  //     price: item.price,
  //   });

  const handleChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setInput((inputs) => ({ ...inputs, [id]: value }));
  };

  const handleSubmit = (event) => {
    console.log(inputs);
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_API_ROOT + "titleUpdate", {
        products: inputs,
      })
      .then((response) => {
        if (response["data"]["status"] == "200") {
          setShowModal(false);
          dispatch(setShowToastForReList(Date.now()));
          dispatch(setResultStatus(Date.now()));
        }
        if (response["data"]["status"] == "500") {
          setShowModal(false);
          dispatch(setShowToastForReList(Date.now()));
          dispatch(setResultStatus("500"));
        }
      });
  };
  return (
    <>
      <button
        type="button"
        // className=" space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        className=" text-center text-dark
        text-base
        py-2
        px-5
        bg-blue-600
        text-white
        border border-[#E8E8E8]"
        onClick={() => setShowModal(true)}
      >
        <span>一括編集</span>
      </button>
      {showModal ? (
        <>
          <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[60%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h5 className="text-3xl font-semibold text-black">
                    一括編集
                  </h5>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between mb-2">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setShowModal(false)}
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        保存
                      </button>
                    </div>
                    {data.map((item) => {
                      return (
                        <div className="mb-1">
                          <input
                            type="text"
                            id={item.id}
                            name=""
                            value={inputs[item.id]}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
                            placeholder=""
                            required
                          />
                        </div>
                      );
                    })}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AllEditModal;
