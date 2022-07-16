import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MoviesStore } from '../movies.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [MoviesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  readonly movies$ = this.movieStore.state$.pipe(map((state) => state.movies));

  constructor(private movieStore: MoviesStore) {}

  ngOnInit(): void {
    this.movieStore.addMovie({
      name: 'Nguyen Thac Hung',
      author: 'Dep trai',
    });
  }
}
