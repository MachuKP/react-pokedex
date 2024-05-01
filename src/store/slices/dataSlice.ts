import { createSlice } from "@reduxjs/toolkit";
import { pokemonData, errorType } from "../../type";

export interface DataState {
  pokemonList: pokemonData[];
  getNext: string;
  getPrevious: string;
  error: errorType;
}

const initialState: DataState = {
  pokemonList: [],
  getNext: '',
  getPrevious: '',
  error: {
    isError: false,
    errorMessage: "",
  },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemonListAction: (state, action) => {
      state.pokemonList = action.payload.results;
      state.getNext = action.payload.getNext;
      state.getPrevious = action.payload.getPrevious;
    },
    setErrorAction: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setPokemonListAction, setErrorAction} = dataSlice.actions;

export default dataSlice.reducer;
