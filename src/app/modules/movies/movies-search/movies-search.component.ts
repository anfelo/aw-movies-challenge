import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movies-search',
  templateUrl: './movies-search.component.html',
})
export class MoviesSearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup = new FormGroup({
    title: new FormControl()
  });

  searchFormSub: Subscription = new Subscription();

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap(query => this.moviesService.fetchMovies({ s: query.title }))
      )
      .subscribe(res => console.log(res));
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
