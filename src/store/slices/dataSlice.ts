import { createSlice } from "@reduxjs/toolkit";
import { pokemonData } from "../../type";
import { CONFIG_API } from "../../config/config";

export interface DataState {
  pokemonListById: pokemonData[];
  pokemonListByName: pokemonData[];
  start: number;
  current: number;
  total: number;
  // getNext: string;
  // getPrevious: string;
  error: boolean;
}

const initialState: DataState = {
  pokemonListById: [],
  pokemonListByName: [],
  start: 0,
  current: CONFIG_API.defaultLimit,
  total: 0,
  // getNext: '',
  // getPrevious: '',
  error: false
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemonListAction: (state, action) => {
      state.pokemonListById = action.payload;
      // state.getNext = action.payload.getNext;
      // state.getPrevious = action.payload.getPrevious;
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
      state.total = action.payload
    }
  },
});

export const {setPokemonListAction, setPokemonListByNameAction, setErrorAction, setOrder, setTotal} = dataSlice.actions;

export default dataSlice.reducer;
