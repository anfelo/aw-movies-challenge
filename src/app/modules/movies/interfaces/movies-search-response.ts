export interface MovieResponse {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface MoviesSearchResponse {
  Response: string;
  Error?: string;
  Search?: MovieResponse[];
  totalResult?: string;
}
