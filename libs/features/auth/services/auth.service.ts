import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap, tap, switchMap } from 'rxjs/operators';
import { environment } from '@sonder/core/environments/environment';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private facebookService: FacebookService,
    private apollo: Apollo
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
    return of(true);
  }

  signIn(credentials: { email: string, password: string }): Observable<boolean> {
    return of(true);
  }

  logOut(): Observable<boolean> {
    return from(this.apollo.getClient().resetStore()).pipe(
      tap(() => localStorage.clear()),
      switchMap(() => of(true))
    );
  }

  isLoggedIn(): Observable<boolean> {
    return of(localStorage.getItem('authToken')).pipe(
      map((token: string) => !!(token && token.length > 0))
    );
  }

  private authenticateBackend(access_token: string): Observable<string> {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return this.http
      .post(`${environment.backendUrl}/api/authenticate`, { access_token }, { headers })
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
