import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      return true;
    }

    this.alertify.warning('You are already logged in..');
    this.router.navigate(['/home']);
    return false;
  }
}
