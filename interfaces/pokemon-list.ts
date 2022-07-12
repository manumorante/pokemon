export interface PokemonListResponse {
  [x: string]: any
  count: number
  next?: string
  previous?: string
  results: SmallPokemon[]
}

export interface SmallPokemon {
  name: string
  img: string
}
