import { Movie } from '../interfaces/movie';

export const groupByYear = (movies: Movie[]): { [key: string]: Movie[] } => {
  return movies.reduce((acc: any, curr: Movie) => {
    if (!acc[curr.year]) {
      acc[curr.year] = [curr];
    } else {
      acc[curr.year].push(curr);
    }
    return acc;
  }, {});
}
