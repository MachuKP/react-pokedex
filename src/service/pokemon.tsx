import { CONFIG_API, CONFIG_URL } from "../config/config";
import { _get } from "./coreRest";

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
