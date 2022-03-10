import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';
import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';

@NgModule({
  declarations: [
    MoviesComponent,
    MoviesListComponent,
    MoviesSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MoviesComponent
  ],
  providers: [
    MoviesService
  ],
})
export class MoviesModule { }
