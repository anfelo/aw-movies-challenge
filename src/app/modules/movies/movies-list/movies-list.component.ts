import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  moviesGroupsByYear: Movie[][] = ([] as Movie[][]);

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.moviesGroupsByYear$.subscribe(moviesGroups => {
      this.moviesGroupsByYear = moviesGroups;
    })
  }
}
