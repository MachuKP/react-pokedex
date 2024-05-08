import { CONFIG_URL } from "../config/config";

export const getPokemonUrl = (url: string) => {
  const pokemonId = url.split("pokemon-species/")[1];
  const pokemonImage = pokemonId.replace("/", ".png");
  return `${CONFIG_URL.pokemonImage}${pokemonImage}`;
};

export const getPokemonId = (url: string) => {
  const pokemonId = url.split("pokemon-species/")[1]
  return pokemonId.replace("/", "");
}

