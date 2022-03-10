import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable()
export class MoviesService {
  MOVIES_URL = 'http://www.omdbapi.com/?apikey=8ea39b15&type=movie';

  constructor(private httpClient: HttpClient) {}

  fetchMovies(query: any) {
    return this.httpClient.get(this.MOVIES_URL, { params: query });
  }
}