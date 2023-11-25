import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "reListingSlice",
  initialState: {
    isSuccess: false,
    status: "",
    checkboxlist: [],
    checkboxbestoffer: [],
    listingExceptAllFlag: true,
    bestOfferAllFlag: true,
  },
  reducers: {
    setShowToastForReList: (state, action) => {
      state.isSuccess = action.payload;
    },
    setResultStatus: (state, action) => {
      state.status = action.payload;
    },
    setCheckboxList: (state, action) => {
      state.checkboxlist = [...state.checkboxlist, action.payload];
    },
    setCheckboxListZero: (state, action) => {
      state.checkboxlist = [];
    },
    setCheckboxListRemove: (state, action) => {
      var arr = state.checkboxlist;
      var index = arr.indexOf(action.payload);
      if (index >= 0) {
        arr.splice(index, 1);
      }
      state.checkboxlist = arr;
    },

    setListingExceptAll: (state, action) => {
      if (state.listingExceptAllFlag == true) {
        state.checkboxlist = action.payload;
      } else {
        state.checkboxlist = [];
      }
    },

    setBestOfferAll: (state, action) => {
      if (state.bestOfferAllFlag == true) {
        state.checkboxbestoffer = action.payload;
      } else {
        state.checkboxbestoffer = [];
      }
    },

    setBestOfferAllFlag: (state, action) => {
      state.bestOfferAllFlag = action.payload;
    },

    setListingExceptAllFlag: (state, action) => {
      state.listingExceptAllFlag = action.payload;
    },

    setCheckboxBestOffer: (state, action) => {
      state.checkboxbestoffer = [...state.checkboxbestoffer, action.payload];
    },
    setCheckboxBestOfferRemove: (state, action) => {
      var arr = state.checkboxbestoffer;
      var index = arr.indexOf(action.payload);
      if (index >= 0) {
        arr.splice(index, 1);
      }
      state.checkboxbestoffer = arr;
    },
  },
});

export const {
  setShowToastForReList,
  setResultStatus,
  setCheckboxList,
  setCheckboxListZero,
  setCheckboxListRemove,
  setCheckboxBestOffer,
  setCheckboxBestOfferRemove,
  setListingExceptAll,
  setBestOfferAll,
  setListingExceptAllFlag,
  setBestOfferAllFlag,
} = editSlice.actions;
export default editSlice.reducer;
