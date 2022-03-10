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

  constructor(private httpClient: HttpClient) {}

  fetchMovies(query: any) {
    return this.httpClient.get(this.MOVIES_URL, { params: query })
      .pipe(
        map((res: any) => {
          if (res.Search) {
            return this.mapResponseToMovies(res.Search);
          }
          return [];
        }),
      );
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