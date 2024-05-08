import { CONFIG_API, CONFIG_URL } from "../config/config";
import { _get } from "./coreRest";


export const getPokemonsCount = async () => {
  const  url = `${CONFIG_URL.pokemonUrl}pokemon-species`;
  try {
    const response = await _get(url);
    return response.data;
  } catch (err) {
    return err
  }
};

export const getAllPokemonsList = async (count: number) => {
  const  url = `${CONFIG_URL.pokemonUrl}pokemon-species?limit=${count}&offset=0`;
  try {
    const response = await _get(url);
    return response.data;
  } catch (err) {
    return err
  }
};

export const getPokemon = async (id: string) => {
  const url =  `${CONFIG_URL.pokemonUrl}pokemon/${id}`;
  try {
    const response = await _get(url);
    return response.data;
  } catch (err) {
    return err
  }
}

export const getPokemons = async (url?: string) => {
  let getUrl;
  if (!url) {
    let limit = CONFIG_API.defaultLimit;
    let offset = CONFIG_API.defaultOffset;
    getUrl = `${CONFIG_URL.pokemonUrl}pokemon-species?limit=${limit}&offset=${offset}`;
  } else {
    getUrl = url;
  }
  try {
    const response = await _get(getUrl);
    return response.data;
  } catch (err) {
    return err
  }
};
