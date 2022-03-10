import { TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MoviesListComponent
      ],
    }).compileComponents();
  });

  it('should create movies list component', () => {
    const fixture = TestBed.createComponent(MoviesListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
