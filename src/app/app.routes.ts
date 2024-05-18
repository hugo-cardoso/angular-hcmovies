import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { environment } from '../environments/environment';

const buildTitle = (title: string) => `${environment.APP_NAME} - ${title}`;

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        title: buildTitle('Home'),
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then(
            (p) => p.HomePageComponent
          ),
      },
      {
        path: 'about',
        title: buildTitle('About'),
        loadComponent: () =>
          import('./pages/about-page/about-page.component').then(
            (p) => p.AboutPageComponent
          ),
      },
      {
        path: 'movies/:id',
        title: buildTitle('Movie'),
        loadComponent: () =>
          import('./pages/movie-page/movie-page.component').then(
            (p) => p.MoviePageComponent
          ),
      },
      {
        path: 'search',
        title: buildTitle('Search'),
        loadComponent: () =>
          import('./pages/search-page/search-page.component').then(
            (p) => p.SearchPageComponent
          ),
      },
    ],
  },
];
