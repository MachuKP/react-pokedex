import { createSlice } from "@reduxjs/toolkit";
import { BasicType } from "../../type";
import { CONFIG_API } from "../../config/config";

export interface DataState {
  pokemonListById: BasicType[];
  pokemonListByName: BasicType[];
  start: number;
  current: number;
  total: number;
  sortStore: string;
  error: boolean;
}

const initialState: DataState = {
  pokemonListById: [],
  pokemonListByName: [],
  start: 0,
  current: CONFIG_API.defaultLimit,
  total: 0,
  sortStore: "ID",
  error: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemonListAction: (state, action) => {
      state.pokemonListById = action.payload;
    },
    setPokemonListByNameAction: (state, action) => {
      state.pokemonListByName = action.payload;
    },
    setErrorAction: (state, action) => {
      state.error = action.payload;
    },
    setOrder: (state, action) => {
      state.start = action.payload.start;
      state.current = action.payload.current;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setSortStore: (state, action) => {
      state.sortStore = action.payload;
    },
  },
});

export const {
  setPokemonListAction,
  setPokemonListByNameAction,
  setErrorAction,
  setOrder,
  setTotal,
  setSortStore
} = dataSlice.actions;

export default dataSlice.reducer;
