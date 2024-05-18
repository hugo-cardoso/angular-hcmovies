import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

import { TmdbService } from '../../services/tmdb.service';
import { IMovieDetails } from '../../interfaces/imovie-details';
import { RequestStatus } from '../../enums/request-status';
import { TmdbImageHelper } from '../../utils/tmdb-image-helper';
import { IMovie } from '../../interfaces/imovie';
import { MoviesCatalogComponent } from '../../components/movies-catalog/movies-catalog.component';
import { MoviesCatalogSkeletonComponent } from '../../components/movies-catalog-skeleton/movies-catalog-skeleton.component';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    MoviesCatalogComponent,
    MoviesCatalogSkeletonComponent,
  ],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent implements OnInit {
  RequestStatus = RequestStatus;

  route = inject(ActivatedRoute);
  tmdbService = inject(TmdbService);
  tmdbImageHelper = inject(TmdbImageHelper);

  id = this.route.snapshot.paramMap.get('id');
  movie = signal<IMovieDetails | null>(null);
  movieRequestStatus = signal(RequestStatus.IDLE);

  movieRecommendations = signal<IMovie[]>([]);
  movieRecommendationsRequestStatus = signal(RequestStatus.IDLE);

  requestMovie() {
    this.movieRequestStatus.set(RequestStatus.LOADING);
    this.tmdbService.getMovieDetails(Number(this.id!)).subscribe({
      next: (data) => {
        this.movie.set(data);
        this.movieRequestStatus.set(RequestStatus.SUCCESS);
      },
      error: () => {
        this.movieRequestStatus.set(RequestStatus.ERROR);
      },
    });
  }

  requestMovieRecommendations() {
    this.movieRecommendationsRequestStatus.set(RequestStatus.LOADING);
    this.tmdbService.getMovieRecommendations(Number(this.id!)).subscribe({
      next: (data) => {
        this.movieRecommendations.set(data.results?.slice(0, 4));
        this.movieRecommendationsRequestStatus.set(RequestStatus.SUCCESS);
      },
      error: () => {
        this.movieRecommendationsRequestStatus.set(RequestStatus.ERROR);
      },
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.requestMovie();
      this.requestMovieRecommendations();
    });
  }
}
