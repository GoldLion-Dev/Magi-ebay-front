import DetailTable from "../components/DetailTable";
import TableFooter from "../components/TableFooter";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { changeCountPerPage } from "./listingSlice";
import {
  setCheckboxList,
  setCheckboxListRemove,
  setBestOfferAll,
  setListingExceptAll,
  setBestOfferAllFlag,
  setListingExceptAllFlag,
} from "./editSlice";

const DetailPage = () => {
  const baseURL = process.env.REACT_APP_API_ROOT + "getDetail";
  const tableHeaders = ["price", "item_code", "listing_date"];
  let temp_checkboxlist = [];

  const [sellerPolicy, setSellerPolicy] = useState([]);
  const [description, setDescription] = useState([]);
  const [optionTexts, setOptionText] = useState({});
  const [tableData, setTableData] = useState([]);
  const [descriptionOption, setDescriptionOption] = useState();
  const [accountOption, setAccountOption] = useState(
    "v^1.1#i^1#f^0#r^1#p^3#I^3#t^Ul4xMF8yOjY5MEM4MUNBOTc4NDlGNDQ0RTZGMDk2MjNCMEU3NjVBXzNfMSNFXjI2MA=="
  );

  const [isLoading, setLoading] = useState();
  const [disable, setDisable] = useState(false);
  const [listed_count, setListedCount] = useState(0);
  const profitElement = useRef();
  const storeElement = useRef();

  const bestOfferList = [];
  const listingExceptAllList = [];

  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const editStatus = useSelector((state) => state.edit.status);
  const checkboxlist = useSelector((state) => state.edit.checkboxlist);
  const bestOfferAllFlag = useSelector((state) => state.edit.bestOfferAllFlag);
  const listingExceptAllFlag = useSelector(
    (state) => state.edit.listingExceptAllFlag
  );
  const checkboxbestoffer = useSelector(
    (state) => state.edit.checkboxbestoffer
  );

  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    dispatch(changeCountPerPage(200));

    axios
      .post(process.env.REACT_APP_API_ROOT + "getProducts", {
        log_id: id,
      })
      .then((response) => {
        console.log(response["data"]["result"]);
        let result = response["data"]["result"];
        setTableData(result);
        setLoading(false);
      });

    // axios
    //   .get(process.env.REACT_APP_API_ROOT + "checkProductStatus")
    //   .then((res) => {});
  }, [editStatus]);

  const sortedTableData = tableData.sort((a, b) => a.price - b.price);
  let displayTableData = [];
  if (countPerPage * activePage <= sortedTableData.length) {
    displayTableData = sortedTableData.slice(
      countPerPage * (activePage - 1),
      countPerPage * activePage
    );
  } else {
    displayTableData = sortedTableData.slice(
      countPerPage * (activePage - 1),
      sortedTableData.length
    );
  }

  return (
    <>
      <DetailTable
        tableHeaders={tableHeaders}
        tableData={displayTableData}
        allTableData={sortedTableData}
      />
      <TableFooter rowCount={tableData.length} />
    </>
  );
};

export default DetailPage;
