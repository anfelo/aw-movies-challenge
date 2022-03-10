import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesService } from './movies.service';

@NgModule({
  declarations: [
    MoviesListComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MoviesListComponent
  ],
  providers: [
    MoviesService
  ],
})
export class MoviesModule { }
