import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { MovieResponse } from './interfaces/movies-search-response';
import { Movie } from './interfaces/movie';
import { BehaviorSubject } from 'rxjs';
import { groupByYear } from './helpers/group-movies-by-year';

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
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./workers/movies-by-year.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        const moviesGroups = Object.values(data) as Movie[][];
        this.moviesGroupsByYear$.next(moviesGroups);
        worker.terminate();
      };
      worker.postMessage({ movies });
    } else {
      const moviesGroupByYear = groupByYear(movies);
      const moviesGroups = Object.values(moviesGroupByYear) as Movie[][];
      this.moviesGroupsByYear$.next(moviesGroups);
    }
  }

  private mapResponseToMovies(moviesRes: MovieResponse[]): Movie[] {
    return moviesRes.map(movie => {
      return {
        poster: movie.Poster,
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
        imdbID: movie.imdbID,
        imdbURL: `https://www.imdb.com/title/${movie.imdbID}`
      };
    });
  }
}