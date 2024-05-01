import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import dataReducer from "./slices/dataSlice";
import loaderReducer from "./slices/loaderSlice";

export const store = configureStore({
  reducer: {
    dataReducer,
    loaderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
