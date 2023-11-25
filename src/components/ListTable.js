import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { resetPagnation, setProcessing } from "../pages/listingSlice";
// import Loader from "./Loader";

const ListTable = ({ tableHeaders, tableData }) => {
  //   const listURL = process.env.REACT_APP_API_URL + "listProduct";
  const isProcessing = useSelector((state) => state.listing.isProcessing);
  const currentPage = useSelector((state) => state.listing.activePage);
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const dispatch = useDispatch();
  const handleResetPagnation = () => {
    dispatch(resetPagnation());
  };
  const handleDetail = (event) => {};
  const formatter = new Intl.DateTimeFormat("ja-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <div class=" mx-10">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="max-w-full overflow-x-auto">
            {/* {isLoading || isProcessing ? (
                <Loader />
              ) : ( */}
            <table class="table-auto w-full">
              <thead>
                <tr class=" bg-blue-600 text-center">
                  {tableHeaders.map((header, key) => {
                    return (
                      <th
                        key={key}
                        class="
                           w-1/6
                           h-[16px]
                           min-w-[160px]
                           max-w-[360px]
                           text-[13px]
                           font-semibold
                           text-white
                           py-2
                           lg:py-3
                           px-2
                           lg:px-3
                           border-l border-transparent
                           "
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td
                        class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           border border-[#E8E8E8]
                           "
                      >
                        {countPerPage * (currentPage - 1) + i + 1}
                      </td>

                      <td
                        class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border border-[#E8E8E8]
                           "
                      >
                        {item.search_url}
                      </td>
                      <td
                        class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           border border-[#E8E8E8]
                           "
                      >
                        {item.date_time}
                      </td>
                      <td
                        class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           border border-[#E8E8E8]
                           "
                      >
                        <div className="flex justify-center items-center">
                          <Link
                            to={`/detailPage/${item.id}`}
                            id={item.id}
                            class="
                              border 
                              py-2
                              px-3
                              text-primary
                              inline-block
                              text-white
                              rounded
                              hover: bg-blue-600 hover:text-white
                              "
                            onClick={handleDetail}
                          >
                            詳細
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTable;
