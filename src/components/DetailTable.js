import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetPagnation, setProcessing } from "../pages/listingSlice";
import Loader from "./Loader";
import ListingLoader from "./ListingLoader";
import EditModal from "./EditModal";
import AllEditModal from "./AllEditModal";
import { useState } from "react";
import {
  setCheckboxBestOffer,
  setCheckboxBestOfferRemove,
} from "../pages/editSlice";

const DetailTable = ({ tableHeaders, tableData, allTableData }) => {
  const currentPage = useSelector((state) => state.listing.activePage);
  const countPerPage = useSelector((state) => state.listing.countPerPage);

  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState();

  const handlePicture = (picture_url) => {
    // const converted_picture = JSON.parse(picture_urls);
    return <img className="w-[100px] h-[100px]" src={picture_url} />;
  };
  return (
    <div class="mx-10 mt-3">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="max-w-full overflow-x-auto">
            <table class="table-auto w-full">
              <thead>
                <tr class=" bg-blue-600 text-center">
                  <th
                    class="
                           w-[2%]
                           h-[16px]
                          
                           text-[13px]
                           font-base
                           text-white
                           py-2
                           lg:py-3
                           px-2
                           lg:px-3
                           border-l border-transparent
                           "
                  >
                    ID
                  </th>
                  <th
                    class="
                         w-[10%]
                         h-[16px]
                       
                         text-[13px]
                         font-base
                         text-white
                       
                         border-l border-transparent
                         "
                  >
                    画像
                  </th>
                  <th
                    class="
                         w-[55%]
                         h-[16px]
                       
                         text-[13px]
                         font-base
                         text-white
                       
                         border-l border-transparent
                         "
                  >
                    title
                  </th>

                  {tableHeaders.map((header, key) => {
                    return (
                      <th
                        key={key}
                        class="
                           w-[20%]
                           h-[16px]
                           min-w-[160px]
                           text-[13px]
                           font-base
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
                    <tr key={item.id}>
                      <td
                        class="
                           text-center text-dark
                           text-base
                           py-5
                           px-2
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {countPerPage * (currentPage - 1) + i + 1}
                      </td>

                      <td
                        class="
                          flex
                          justify-center
                          items-center
                           text-center text-dark
                           text-base
                           py-2
                          
                           bg-white
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {handlePicture(item.image_url)}
                      </td>
                      <td
                        class="
                           text-center text-dark
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {item.title}
                      </td>
                      <td
                        class="
                           text-center text-dark
                           text-base
                           py-5
                           px-2
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {item.price}
                      </td>
                      <td
                        class="
                           text-center text-dark
                           text-base
                           py-5
                           px-2
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {item.item_code}
                      </td>
                      <td
                        class="
                           text-center text-dark
                           text-base
                           py-5
                           px-2
                           border-b border-l border-[#E8E8E8]
                           "
                      >
                        {item.listing_date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTable;
