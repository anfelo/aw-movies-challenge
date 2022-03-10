import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  moviesGroupsByYear: Movie[][] = ([] as Movie[][]);
  moviesByYearSub: Subscription = new Subscription();

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesByYearSub = this.moviesService.moviesGroupsByYear$.subscribe(moviesGroups => {
      this.moviesGroupsByYear = moviesGroups;
    })
  }

  ngOnDestroy(): void {
    this.moviesByYearSub.unsubscribe();
  }
}
