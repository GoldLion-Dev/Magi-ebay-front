import { useEffect, useState, useRef } from "react";
import ListTable from "../components/ListTable";
import TableFooter from "../components/TableFooter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ExtractingLoader from "../components/ExtractingLoader";
import { resetPagnation } from "./listingSlice";

const Dashboard = () => {
  const [sellerPolicy, setSellerPolicy] = useState([]);
  const [description, setDescription] = useState([]);
  const [optionTexts, setOptionText] = useState({});
  const [tableData, setTableData] = useState([]);
  const [descriptionOption, setDescriptionOption] = useState();
  const [isLoading, setLoading] = useState();
  const [disable, setDisable] = useState(false);
  const [extractedCount, setExtractedCount] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [inputValues, setInputValue] = useState({});
  const [textValues, setTextValue] = useState({});
  const dispatch = useDispatch();
  // const profitElement = useRef();
  const urlElement = useRef();
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const isProcessing = useSelector((state) => state.listing.isProcessing);
  const [count, setCount] = useState(0);
  const duration = 1000; // 1 second in milliseconds

  useEffect(() => {
    let timeoutId;

    function tick() {
      setCount((count) => count + 1);
      timeoutId = setTimeout(tick, duration);
      console.log(count);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ROOT + "getSellerProfile")
      .then((response) => {
        if (response["status"] == "200") {
          setSellerPolicy(response["data"]);
          setOptionText({
            payment: response["data"]["paymentlist"][0],
            shipping: response["data"]["shippinglist"][0],
            return: response["data"]["returnlist"][0],
          });
          console.log(response["data"]);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ROOT + "getSettingInformation")
      .then((response) => {
        if (response["status"] == "200") {
          const result = response["data"]["result"];
          console.log(result);
          setTextValue(response["data"]["result"]);
          setInputValue((values) => ({
            ...values,
            currency_rate: result["currency_rate"],
            profit_rate: result["profit_rate"],
            countdown_duration: result["countdown_duration"],
            countdown_money: result["countdown_money"],
            endlist_duration: result["endlist_duration"],
            discount_stopper: result["discount_stopper"],
            description: result["description"],
            shipping_cost1: result["shipping_cost1"],
            shipping_cost2: result["shipping_cost2"],
            shipping_cost3: result["shipping_cost3"],
            shipping_cost4: result["shipping_cost4"],
          }));
        }
      });
  }, [isLoading]);

  const handleChangeText = (event) => {
    setInputValue((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSellerPolicyChange = (event) => {
    let index = event.nativeEvent.target.selectedIndex;
    let text = event.nativeEvent.target[index].text;
    let value = event.nativeEvent.target[index].value;
    setOptionText((values) => ({
      ...values,
      [event.target.id]: { profileId: value, profileName: text },
    }));
  };

  const handleOptions = (key) => {
    if (sellerPolicy[key] != undefined) {
      let optionlist = [];
      sellerPolicy[key].map((payment) => {
        optionlist.push(
          <option value={payment["profileId"]}>{payment["profileName"]}</option>
        );
      });
      return optionlist;
    }
  };

  const handleStartClick = () => {
    console.log(optionTexts);
    console.log(inputValues);

    if (urlElement.current.value == "") {
      alert("検索URLを入力してください。");
    } else {
      setLoading(true);
      axios
        .post(process.env.REACT_APP_API_ROOT + "listProduct", {
          businessPolicy: optionTexts,
          inputValues: inputValues,
        })
        .then((response) => {
          if (response["status"] == "500") {
            alert("すべての入力フィールドに入力してください。");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // clearTimeout(timer);
      let timeoutId;
      const inteval = () => {
        axios
          .get(process.env.REACT_APP_API_ROOT + "getListingStatus")
          .then((response) => {
            if (response["data"]["result"] == "stop") {
              clearTimeout(timeoutId);
              setLoading(false);
              setDisable(false);
            }
            if (response["data"]["status"] == "500") {
              alert("すべての入力フィールドに入力してください。");
              clearTimeout(timeoutId);
              setLoading(false);
              setDisable(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        timeoutId = setTimeout(inteval, 2000);
      };
      const timer = setTimeout(() => {
        inteval();
      }, 5000); // Delay of 10 seconds
    }
  };

  const handleStopClick = () => {
    axios
      .post(process.env.REACT_APP_API_ROOT + "stop", {
        businessPolicy: optionTexts,
        inputValues: inputValues,
      })
      .then((res) => {});

    // window.location.reload();
    setLoading(false);
  };

  let displayTableData = [];
  if (countPerPage * activePage <= tableData.length) {
    displayTableData = tableData.slice(
      countPerPage * (activePage - 1),
      countPerPage * activePage
    );
  } else {
    displayTableData = tableData.slice(
      countPerPage * (activePage - 1),
      tableData.length
    );
  }
  const tableHeaders = ["ID", "店名", "日付時刻 ", "アクション"];

  return (
    <>
      <div class="container mb-3 mt-6 ml-3 mr-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">URL:</div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[50%] md:w-[50%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="url"
                  ref={urlElement}
                  onChange={handleChangeText}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full whitespace-nowrap">
                通貨レート:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[25%] md:w-[25%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="currency_rate"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.currency_rate || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  ドル(1円：)
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">利益率:</div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="profit_rate"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.profit_rate || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  %
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">割引期間:</div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="countdown_duration"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.countdown_duration || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  日
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">割引金:</div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="countdown_money"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.countdown_money || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  %
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">
                出品キャンセル期間:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="endlist_duration"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.endlist_duration || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  日
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">
                割引ストッパー:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="discount_stopper"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.discount_stopper || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  %
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">
                原価 3000円まで:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="shipping_cost1"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.shipping_cost1 || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  円
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">
                原価3000円以上10000円未満:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="shipping_cost2"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.shipping_cost2 || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  円
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">
                原価10000円以上原価20000円未満:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="shipping_cost3"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.shipping_cost3 || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  円
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">
                原価20000円以上:
              </div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="text"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="shipping_cost4"
                  onChange={handleChangeText}
                  placeholder=""
                  value={inputValues.shipping_cost4 || ""}
                />
                <div className="sm:w-[30%] md:w-[30%] whitespace-nowrap px-1 ">
                  円
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">Graded:</div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="checkbox"
                  value="graded"
                  class=" p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="graded"
                  onChange={handleChangeText}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">PSA10/PSA9:</div>
              <div class="relative mb-3 mt-2 flex h-6 sm:w-[20%] md:w-[20%] w-full">
                <input
                  type="radio"
                  id="psa10"
                  name="psa"
                  value="psa10"
                  onChange={handleChangeText}
                />
                <label for="psa10">PSA10</label>
                <input
                  type="radio"
                  id="psa9"
                  name="psa"
                  value="psa9"
                  onChange={handleChangeText}
                />
                <label for="psa9">PSA9</label>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-5">
              <div className="sm:w-[10%] md:w-[10%] w-full">説明文:</div>
              <div class="relative mb-3 mt-2 flex  sm:w-[50%] md:w-[50%] w-full">
                <textarea
                  rows="10"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  name="description"
                  onChange={handleChangeText}
                  placeholder=""
                  defaultValue={textValues["description"]}
                />
              </div>
            </div>

            <div className="flex flex-wrap  justify-center items-end  space-x-1 mb-6">
              <div>
                <label
                  for="payment"
                  className=" w-1/3  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  支払いポリシー:
                </label>
                <select
                  id="payment"
                  className="sm:w-1/3 min-w-max w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleSellerPolicyChange}
                >
                  {handleOptions("paymentlist")}
                </select>
              </div>
              <div>
                <label
                  for="shipping"
                  className=" w-1/3  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  配送ポリシー:
                </label>
                <select
                  id="shipping"
                  className="sm:w-1/3 min-w-max w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleSellerPolicyChange}
                >
                  {handleOptions("shippinglist")}
                </select>
              </div>
              <div>
                <label
                  for="return"
                  className=" w-1/3  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  返品ポリシー:
                </label>
                <select
                  id="return"
                  className="sm:w-1/3 min-w-max w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleSellerPolicyChange}
                >
                  {handleOptions("returnlist")}
                </select>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-wrap justify-end">
          <div>
            <button
              className=" space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              onClick={handleStartClick}
              disabled={isLoading}
              // disabled={disable}
            >
              開始
            </button>
          </div>

          <div>
            <button
              className=" space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              onClick={handleStopClick}
              // disabled={disable}
            >
              停止
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
