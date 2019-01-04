import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap, tap, switchMap } from 'rxjs/operators';
import { environment } from '@sonder/core/environments/environment';
import { Apollo } from 'apollo-angular';
import { LogOutService } from './log-out.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private facebookService: FacebookService,
    private apollo: Apollo,
    private logOutService: LogOutService,
    private backendService: BackendService
  ) {
    const params: InitParams = {
      version: 'v2.10',
      appId: environment.facebookAppId
    };
    facebookService.init(params);
  }

  facebookLogIn(): Observable<boolean> {
    return this.authenticateFacebook().pipe(
      tap((facebookToken: string) => localStorage.setItem('facebookToken', facebookToken)),
      exhaustMap((facebookToken: string) => this.authenticateBackend(facebookToken)),
      tap((backendToken: string) => localStorage.setItem('authToken', backendToken)),
      map(() => true),
      catchError(() => this.logOut())
    )
  }

  signUp(credentials: { email: string, password: string }): Observable<boolean> {
    return this.backendService
      .post('sign-up', { ...credentials }, false)
      .pipe(
        map((response: any) => response.auth_token),
        tap((backendToken: string) => localStorage.setItem('authToken', backendToken)),
        map(() => true),
        catchError(() => this.logOut())
      )
  }

  signIn(credentials: { email: string, password: string }): Observable<boolean> {
    return this.backendService
      .post('sign-in', { ...credentials }, false)
      .pipe(
        map((response: any) => response.auth_token),
        tap((backendToken: string) => localStorage.setItem('authToken', backendToken)),
        map(() => true),
        catchError(() => this.logOut())
      )
  }

  logOut(): Observable<boolean> {
    return this.logOutService.logOut();
  }

  isLoggedIn(): Observable<boolean> {
    return of(localStorage.getItem('authToken')).pipe(
      map((token: string) => !!(token && token.length > 0))
    );
  }

  private authenticateBackend(access_token: string): Observable<string> {
    return this.backendService
      .post('authenticate/facebook', { access_token }, false)
      .pipe(
        map((response: any) => response.auth_token)
      );
  }

  private authenticateFacebook(): Observable<string> {
    return from(this.facebookService.getLoginStatus()).pipe(
      exhaustMap(
        data =>
          data.status === 'connected'
            ? of(data)
            : from(this.facebookService.login())
      ),
      map(data => data.authResponse.accessToken)
    );
  }
}
