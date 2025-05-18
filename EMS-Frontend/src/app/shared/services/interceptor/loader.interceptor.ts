import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../common/loader.service';
import { delay, finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  console.log(`request hit on ${req.url}`);
  
  loaderService.showLoader();
  return next(req).pipe(
    delay(2000),
    finalize(() => {
      loaderService.hideLoader();
    })
  )
};
