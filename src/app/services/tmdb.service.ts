import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, count, map, retry, shareReplay } from 'rxjs';

import { environment } from '../../environments/environment';
import { IMovie } from '../interfaces/imovie';
import { IMovieDetails } from '../interfaces/imovie-details';

type ApiResponse<T> = {
  results: T;
};

type ApiResponsePaginated<T> = {
  page: number;
  total_pages: number;
  total_results: number;
} & ApiResponse<T>;

type ApiRequestPaginatedParams = {
  page?: number;
};

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private httpClient = inject(HttpClient);
  private url = environment.TMDB_API_URL;

  getDiscoveryMovies(): Observable<IMovie[]> {
    return this.httpClient
      .get<ApiResponse<IMovie[]>>(`${this.url}/discover/movie`)
      .pipe(
        shareReplay(),
        retry({ count: 3, delay: 1000 }),
        map((res) => res.results)
      );
  }

  getSearchMovies(
    query: string,
    options?: ApiRequestPaginatedParams
  ): Observable<ApiResponsePaginated<IMovie[]>> {
    return this.httpClient.get<ApiResponsePaginated<IMovie[]>>(
      `${this.url}/search/movie`,
      {
        params: {
          query,
          page: options?.page || 1,
        },
      }
    );
  }

  getMovieDetails(id: number): Observable<IMovieDetails> {
    return this.httpClient
      .get<IMovieDetails>(`${this.url}/movie/${id}`)
      .pipe(shareReplay());
  }

  getMovieRecommendations(
    id: number,
    options?: ApiRequestPaginatedParams
  ): Observable<ApiResponsePaginated<IMovie[]>> {
    return this.httpClient
      .get<ApiResponsePaginated<IMovie[]>>(
        `${this.url}/movie/${id}/recommendations`
      )
      .pipe(shareReplay());
  }

  getNowPlayingMovies(
    options?: ApiRequestPaginatedParams
  ): Observable<ApiResponsePaginated<IMovie[]>> {
    return this.httpClient
      .get<ApiResponsePaginated<IMovie[]>>(`${this.url}/discover/movie`, {
        params: {
          page: options?.page || 1,
        },
      })
      .pipe(shareReplay());
  }
}
