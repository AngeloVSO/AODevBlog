import { environment } from './../../environments/environment';
import { ApplicationUserCreate } from './../models/account/application-user-create.model';
import { ApplicationUserLogin } from './../models/account/application-user-login.model';
import { ApplicationUser } from './../models/account/application-user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSubject$: BehaviorSubject<ApplicationUser | any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<ApplicationUser>(
      JSON.parse(localStorage.getItem('aodevBlog-currentuser')!)
    );
  }

  login(model: ApplicationUserLogin): Observable<ApplicationUser> {
    return this.http
      .post<ApplicationUser>(`${environment.webApi}/Account/login`, model)
      .pipe(
        map((user: ApplicationUser) => {
          if (user) {
            localStorage.setItem('aodevBlog-currentUser', JSON.stringify(user));
            this.setCurrentuser(user);
          }

          return user;
        })
      );
  }

  register(model: ApplicationUserCreate): Observable<ApplicationUser> {
    return this.http
      .post<ApplicationUser>(`${environment.webApi}/Account/register`, model)
      .pipe(
        map((user: ApplicationUser) => {
          if (user) {
            localStorage.setItem('aodevBlog-currentUser', JSON.stringify(user));
            this.setCurrentuser(user);
          }
          return user;
        })
      );
  }

  setCurrentuser(user: ApplicationUser) {
    this.currentUserSubject$.next(user);
  }

  logout() {
    localStorage.removeItem('aodevBlog-currentUser');
    this.currentUserSubject$.next(null);
  }

  isLoggedIn() {
    return this.currentUserValue && this.currentUserValue.token;
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject$.value;
  }
}
