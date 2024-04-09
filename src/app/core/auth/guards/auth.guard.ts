import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLogged: boolean = localStorage.getItem('token') != null;
  if (!isLogged) {
    router.navigate(['login']);
    return false;
  }
  return true;
};

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLogged: boolean = localStorage.getItem('token') != null;
  if (isLogged) {
    console.log(route);
    router.navigate([route.url]);
    return false;
  }
  return true;
};
