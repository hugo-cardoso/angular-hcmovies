import { Component, Input, inject } from '@angular/core';
import { IMovie } from '../../interfaces/imovie';
import { TmdbImageHelper } from '../../utils/tmdb-image-helper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  tmdbImageHelper = inject(TmdbImageHelper);

  @Input() movie: IMovie | null = null;
}
