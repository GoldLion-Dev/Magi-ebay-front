import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./pages/listingSlice";
import editReducer from "./pages/editSlice";

export default configureStore({
  reducer: {
    listing: listingReducer,
    edit:editReducer
  },
});
