import { Component, Input, inject } from '@angular/core';
import { IMovie } from '../../interfaces/imovie';
import { TmdbImageHelper } from '../../utils/tmdb-image-helper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-hero.component.html',
  styleUrl: './movie-hero.component.scss',
})
export class MovieHeroComponent {
  tmdbImageHelper = inject(TmdbImageHelper);

  @Input({ required: true }) movie!: IMovie;
}
