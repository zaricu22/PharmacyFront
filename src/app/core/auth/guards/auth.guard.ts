import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLogged: boolean = localStorage.getItem('access-token') != null;
  if (!isLogged) {
    router.navigate(['login']);
    return false;
  }
  return true;
};

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLogged: boolean = localStorage.getItem('access-token') != null;
  if (isLogged) {
    // redirect to home page — using route.url (UrlSegment[]) here caused a crash
    // because router.navigate() cannot serialize UrlSegment objects
    router.navigate(['product']);
    return false;
  }
  return true;
};
