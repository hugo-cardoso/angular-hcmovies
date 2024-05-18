import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

type BackDropSize = 'w300' | 'w780' | 'w1280' | 'original';

type PosterSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

@Injectable({ providedIn: 'root' })
export class TmdbImageHelper {
  private tmdbImageBaseUrl = environment.TMDB_API_IMAGE_URL;

  getPosterUrl(posterPath: string, size: PosterSize = 'w500'): string {
    return `${this.tmdbImageBaseUrl}/${size}${posterPath}`;
  }

  getBackdropUrl(backdropPath: string, size: BackDropSize = 'w1280'): string {
    return `${this.tmdbImageBaseUrl}/${size}${backdropPath}`;
  }
}
