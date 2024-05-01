export interface pokemonData {
  name: string;
  url: string;
}

export interface errorType {
  isError: boolean;
  errorMessage: string;
}

export interface dataStateType {
  results: pokemonData[];
  next: string;
  previous: string;
}
