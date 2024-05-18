export interface IMovieDetails {
  id: number;
  title: string;
  genres: {
    id: number;
    name: string;
  }[];
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}
