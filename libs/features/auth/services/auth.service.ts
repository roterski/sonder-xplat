import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { environment } from '@sonder/core/environments/environment';
import { Apollo } from 'apollo-angular';
import { switchMap } from 'rxjs/internal/operators/switchMap';

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

  logIn(): Observable<boolean> {
    return this.facebookLogIn().pipe(
      tap((facebookToken: string) => localStorage.setItem('facebookToken', facebookToken)),
      exhaustMap((facebookToken: string) => this.authenticateBackend(facebookToken)),
      tap((backendToken: string) => localStorage.setItem('authToken', backendToken)),
      map(() => true),
      catchError(() => this.logOut())
    )
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

  private authenticateBackend(access_token: string): Observable<any> {
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

  private facebookLogIn(): Observable<any> {
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
