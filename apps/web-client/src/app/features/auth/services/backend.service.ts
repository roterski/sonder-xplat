import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { map, catchError, concat, mergeMap, delay, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SessionQuery } from '../state/session.query';
import { LogOutService } from '../state/log-out.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private sessionQuery: SessionQuery,
    private logOutService: LogOutService) { }

  get(path: string, params: any = {}): Observable<any> {
    return this.performAuthenticatedRequest(headers => {
      return this.http.get(this.url(path), {
        ...headers,
        params
      });
    });
  }

  post(path: string, data: any = {}): Observable<any> {
    return this.performAuthenticatedRequest(headers => {
      return this.http.post(this.url(path), data, headers);
    });
  }

  put(path: string, data: any = {}): Observable<any> {
    return this.performAuthenticatedRequest(headers => {
      return this.http.put(this.url(path), data, headers);
    });
  }

  authenticate(accessToken: string): Observable<any> {
    return this.http
      .post(this.url('/authenticate'), { access_token: accessToken }, this.staticHeaders())
      .pipe(
        map((response: any) => response.auth_token),
        catchError(error => this.rethrow(error))
      );
  }

  private performAuthenticatedRequest(requestMethod): Observable<any> {
      return this.sessionQuery.backendToken$
        .pipe(
          filter((token: string) => !!token),
          // delay(environment.production ? 0 : 1000), // DEVELOPMENT_ONLY
          switchMap((token: string) => requestMethod(this.headers(token))),
          catchError((error) => {
            if (error.status === 401) { this.logOutService.logOut(); }
            return error;
          })
        );
  }

  private url(path) {
    return `${this.apiRoot()}${path}`;
  }

  private apiRoot(): string {
    return `${environment.backendUrl}/api`;
  }

  private staticHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  }

  private rethrow(error) {
    return throwError('json' in error ? error.json() : error);
  }

  private headers(accessToken: string) {
    return {
      headers: {
        ...this.staticHeaders().headers,
        Authorization: accessToken
      }
    };
  }
}
