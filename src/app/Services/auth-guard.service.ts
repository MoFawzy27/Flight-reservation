
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authStatusSubject = new BehaviorSubject<string>(this.checkAuthStatus());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private router:Router) {
    // Check initial value from localStorage
    this.updateAuthStatus();
  }

  private checkAuthStatus(): string {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isUser = localStorage.getItem('isUser') === 'true';

    if (isAdmin) {
      return 'admin';
    } else if (isUser) {
      return 'user';
    } else {
      return 'guest';
    }
  }

  updateAuthStatus(): void {
    this.authStatusSubject.next(this.checkAuthStatus());
  }

  setAdmin(): void {
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('isUser', 'false');
    this.updateAuthStatus();
  }

  setUser(): void {
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('isUser', 'true');
    this.updateAuthStatus();
  }

  logout(): void {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');
    localStorage.removeItem('userId');
    this.updateAuthStatus();
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem("isAdmin")==="true") {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/sign-in']); // Redirect to login page if not logged in
      return false; // Deny access to the route
    }
  }

}
