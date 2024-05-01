export interface pokemonData {
  name: string;
  url: string;
}

export interface dataStateType {
  results: pokemonData[];
  next: string;
  previous: string;
}

export interface configModalType {
  title: string;
  description: string;
  buttonConfirm: string;
}
