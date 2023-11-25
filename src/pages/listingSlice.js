import { createSlice } from "@reduxjs/toolkit";

export const listingSlice = createSlice({
  name: "listing",
  initialState: {
    countPerPage: 200,
    activePage: 1,
    isProcessing: false,
  },
  reducers: {
    changeCountPerPage: (state, action) => {
      state.countPerPage = action.payload;
      state.activePage = 1;
    },
    changeActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    previousPage: (state) => {
      state.activePage -= 1;
    },
    nextPage: (state) => {
      state.activePage += 1;
    },
    resetPagnation: (state) => {
      state.activePage = 1;
      state.countPerPage = 200;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
});

export const {
  changeCountPerPage,
  changeActivePage,
  previousPage,
  nextPage,
  resetPagnation,
  setProcessing,
} = listingSlice.actions;
export default listingSlice.reducer;
