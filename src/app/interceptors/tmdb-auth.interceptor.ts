import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const tmdbAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.TMDB_API_URL)) return next(req);

  const newReq = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${environment.TMDB_API_KEY}`
    ),
    params: req.params.set('language', environment.TMDB_API_LANGUAGE),
  });

  return next(newReq);
};
