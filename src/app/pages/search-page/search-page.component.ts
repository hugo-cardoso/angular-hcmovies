import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestStatus } from '../../enums/request-status';
import { IMovie } from '../../interfaces/imovie';
import { TmdbService } from '../../services/tmdb.service';
import { MoviesCatalogComponent } from '../../components/movies-catalog/movies-catalog.component';
import { MoviesCatalogSkeletonComponent } from '../../components/movies-catalog-skeleton/movies-catalog-skeleton.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [MoviesCatalogComponent, MoviesCatalogSkeletonComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  RequestStatus = RequestStatus;

  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);

  query = signal('');
  page = signal(1);

  searchResults = signal<IMovie[]>([]);
  searchTotalResults = signal(0);
  searchTotalPages = signal(0);
  searchRequestStatus = signal(RequestStatus.IDLE);

  enabledPrevPage = computed(() => this.page() > 1);
  enabledNextPage = computed(() => this.page() < this.searchTotalPages());

  searchQuery(query: string, page = 1) {
    this.searchRequestStatus.set(RequestStatus.LOADING);
    this.searchResults.set([]);
    this.searchTotalResults.set(0);
    this.searchTotalPages.set(0);

    this.tmdbService.getSearchMovies(query, { page }).subscribe({
      next: (data) => {
        this.searchResults.set(data.results);
        this.page.set(page);
        this.searchTotalResults.set(data.total_results);
        this.searchTotalPages.set(data.total_pages);
        this.searchRequestStatus.set(RequestStatus.SUCCESS);
      },
      error: () => {
        this.searchRequestStatus.set(RequestStatus.ERROR);
      },
    });
  }

  handleClickNextPage() {
    if (!this.enabledNextPage()) return;
    this.scrollToTop();
    this.searchQuery(this.query(), this.page() + 1);
  }

  handleClickPrevPage() {
    if (!this.enabledPrevPage()) return;
    this.scrollToTop();
    this.searchQuery(this.query(), this.page() - 1);
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const query = params.get('query') || '';

      this.query.set(query);
      if (query) this.searchQuery(query);
    });
  }
}
