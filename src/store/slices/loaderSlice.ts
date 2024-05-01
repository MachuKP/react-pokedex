import { createSlice } from "@reduxjs/toolkit";

export interface LoaderState {
  showLoader: boolean;
}

const initialState: LoaderState = {
  showLoader: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
  },
});

export const { setShowLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
