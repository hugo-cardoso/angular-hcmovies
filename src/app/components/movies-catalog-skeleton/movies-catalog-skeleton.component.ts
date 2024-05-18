import { Component, Input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movies-catalog-skeleton',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movies-catalog-skeleton.component.html',
  styleUrl: './movies-catalog-skeleton.component.scss',
})
export class MoviesCatalogSkeletonComponent {
  @Input({ required: true }) count!: number;

  get range(): null[] {
    return new Array(this.count).fill(null);
  }
}
