import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tmdbAuthInterceptor } from './interceptors/tmdb-auth.interceptor';
import { provideImgixLoader } from '@angular/common';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tmdbAuthInterceptor])),
    provideImgixLoader(environment.TMDB_API_IMAGE_URL),
  ],
};
