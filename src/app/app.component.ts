import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie, MoviesStore } from './movies.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MoviesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'test-ngrx-component';
  movies$ = this.moviesStore.state$.pipe(map((state) => state.movies));

  constructor(private readonly moviesStore: MoviesStore) {
    moviesStore.setState({
      movies: [
        {
          name: 'hello',
          author: 'NT Hung',
        },
        {
          name: 'bye',
          author: 'NT Hung',
        },
        {
          name: 'afternoon',
          author: 'NT Hung',
        },
      ],
    });
  }

  movieSelected!: Movie;

  moviesSelected$ = this.moviesStore.movies$
    .pipe(map((movies) => movies.find((movie) => movie.name === 'mid night')))
    .subscribe((movie) => {
      if (movie) this.movieSelected = movie;
    });

  addMovie() {
    this.moviesStore.addMovie({ name: 'mid night', author: 'NT Hung' });
  }

  ngOnInit(): void {}
}
