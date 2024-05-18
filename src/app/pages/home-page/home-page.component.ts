import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MovieHeroComponent } from '../../components/movie-hero/movie-hero.component';
import { RequestStatus } from '../../enums/request-status';
import { IMovie } from '../../interfaces/imovie';
import { TmdbService } from '../../services/tmdb.service';
import { TmdbImageHelper } from '../../utils/tmdb-image-helper';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MoviesCatalogComponent } from '../../components/movies-catalog/movies-catalog.component';
import { MoviesCatalogSkeletonComponent } from '../../components/movies-catalog-skeleton/movies-catalog-skeleton.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MovieHeroComponent,
    MoviesCatalogComponent,
    MoviesCatalogSkeletonComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  RequestStatus = RequestStatus;

  tmdbService = inject(TmdbService);
  tmdbImageHelper = inject(TmdbImageHelper);

  nowPlayingMovies = signal<IMovie[]>([]);
  nowPlayingMoviesRequestStatus = signal<RequestStatus>(RequestStatus.IDLE);
  nowPlayingMovie = computed(() => this.nowPlayingMovies()?.at(0));

  ngOnInit() {
    this.nowPlayingMoviesRequestStatus.set(RequestStatus.LOADING);
    this.tmdbService.getDiscoveryMovies().subscribe({
      next: (movies) => {
        this.nowPlayingMovies.set(movies);
        this.nowPlayingMoviesRequestStatus.set(RequestStatus.SUCCESS);
      },
      error: () => {
        this.nowPlayingMoviesRequestStatus.set(RequestStatus.ERROR);
      },
    });
  }
}
