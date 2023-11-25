import { useEffect, useState, useRef } from "react";
import ListTable from "../components/ListTable";
import TableFooter from "../components/TableFooter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ExtractingLoader from "../components/ExtractingLoader";
import { resetPagnation } from "./listingSlice";

const Description = () => {
  const [sellerPolicy, setSellerPolicy] = useState([]);
  const [description, setDescription] = useState([]);
  const [optionTexts, setOptionText] = useState({});
  const [tableData, setTableData] = useState([]);
  const [descriptionOption, setDescriptionOption] = useState();
  const [isLoading, setLoading] = useState();
  const [disable, setDisable] = useState(false);
  const [extractedCount, setExtractedCount] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const dispatch = useDispatch();
  // const profitElement = useRef();
  const storeElement = useRef();
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const isProcessing = useSelector((state) => state.listing.isProcessing);
  useEffect(() => {
    dispatch(resetPagnation());
    axios.get(process.env.REACT_APP_API_ROOT + "getLog").then((response) => {
      if (response["status"] == "200") {
        setTableData(response["data"]["result"]);
      }
    });
  }, []);

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
  const tableHeaders = ["ID", "url", "日付時刻 ", "アクション"];

  return (
    <div className=" mt-3">
      <ListTable tableHeaders={tableHeaders} tableData={displayTableData} />
      <TableFooter rowCount={tableData.length} />
    </div>
  );
};

export default Description;
