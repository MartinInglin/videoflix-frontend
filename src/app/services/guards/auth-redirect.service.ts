import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectService {

  router = inject(Router);

  constructor() {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }
}