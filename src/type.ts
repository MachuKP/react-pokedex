export interface BasicType {
  name: string;
  url: string;
}

export interface dataStateType {
  results: BasicType[];
  next: string;
  previous: string;
}

export interface configModalType {
  title: string;
  description: string;
  buttonConfirm: string;
}

export interface typeItemType {
  slot: number;
  type: BasicType;
}

export interface abilityItemType {
  slot: number;
  ability: BasicType;
  is_hidden: boolean;
}
