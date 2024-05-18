import { Component, Input } from '@angular/core';
import { IMovie } from '../../interfaces/imovie';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movies-catalog',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movies-catalog.component.html',
  styleUrl: './movies-catalog.component.scss',
})
export class MoviesCatalogComponent {
  @Input({ required: true }) movies: IMovie[] = [];
}
