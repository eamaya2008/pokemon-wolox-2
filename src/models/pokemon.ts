export type NameUrl = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: NameUrl[];
};

//TODO obtain language for the moves and stats
export type Pokemon = {
  name: string;
  abilities: Ability[];
  id: number;
  height: number;
  weight: number;
  types: PokemonClassType[];
  sprites: Sprites;
  moves: Moves[];
  stats: Stat[];
  base_experience: number;
  forms: NameUrl[];
  game_indices: GameIndex[];
  held_items: unknown[];
  is_default: boolean;
  location_area_encounters: string;
  order: number;
  past_types: unknown[];
  species: NameUrl;
};

export type GameIndex = {
  game_index: number;
  version: NameUrl;
};

export type Ability = {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
};

export type PokemonTypeColor = {
  [key: string]: string;
};

export type Moves = {
  move: NameUrl;
  version_group_details: VersioGroupDetail[];
};

export type VersioGroupDetail = {
  level_learned_at: number;
  move_learn_method: NameUrl;
  version_group: NameUrl;
};

export type Sprites = {
  [key: string]: string | null | Sprites;
};

export type PokemonClassType = {
  slot: number;
  type: NameUrl;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: NameUrl;
};
