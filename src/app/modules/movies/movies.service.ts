import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { MovieResponse } from './interfaces/movies-search-response';
import { Movie } from './interfaces/movie';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MoviesService {
  MOVIES_URL = 'http://www.omdbapi.com/?apikey=8ea39b15&type=movie';

  moviesList$: BehaviorSubject<Movie[]> = new BehaviorSubject(([] as Movie[]));
  moviesGroupsByYear$: BehaviorSubject<Movie[][]> = new BehaviorSubject(([] as Movie[][]));

  constructor(private httpClient: HttpClient) {}

  fetchMovies(query: any) {
    return this.httpClient.get(this.MOVIES_URL, { params: query })
      .pipe(
        map((res: any) => {
          if (res.Search) {
            const movies = this.mapResponseToMovies(res.Search);
            this.moviesList$.next(movies);
            this.groupMoviesByYear(movies);
            return movies;
          }
          return [];
        }),
      );
  }

  groupMoviesByYear(movies: Movie[]): void {
    const moviesGroupByYear = movies.reduce((acc: any, curr: Movie) => {
      if (!acc[curr.year]) {
        acc[curr.year] = [curr];
      } else {
        acc[curr.year].push(curr);
      }
      return acc;
    }, {});
    const moviesGroups = Object.values(moviesGroupByYear) as Movie[][];
    this.moviesGroupsByYear$.next(moviesGroups);
    // if (typeof Worker !== 'undefined') {
    //   // Create a new
    //   const worker = new Worker('./workers/movies-by-year.worker', { type: 'module' });
    //   worker.onmessage = ({ data }) => {
    //     console.log(`page got message: ${data}`);
    //   };
    //   worker.postMessage({ movies });
    // } else {
    //   // Fallback if web workers are not supported

    // }
  }

  private mapResponseToMovies(moviesRes: MovieResponse[]): Movie[] {
    return moviesRes.map(movie => {
      return {
        poster: movie.Poster,
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
        imdbID: movie.imdbID,
      };
    });
  }
}