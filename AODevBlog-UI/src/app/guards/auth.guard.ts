import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.accountService.isLoggedIn()) {
      return true;
    }

    this.toastService.info(
      `You don´t have access to this page: ${route.url}.\nYou must to be logged in!`
    );
    this.router.navigate(['/']);
    return false;
  }
}
