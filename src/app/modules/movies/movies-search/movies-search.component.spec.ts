import { TestBed } from '@angular/core/testing';
import { MoviesSearchComponent } from './movies-search.component';

describe('MoviesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MoviesSearchComponent
      ],
    }).compileComponents();
  });

  it('should create movies search component', () => {
    const fixture = TestBed.createComponent(MoviesSearchComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
