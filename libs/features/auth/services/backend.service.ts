import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  catchError,
  switchMap,
} from 'rxjs/operators';
import { environment } from '@sonder/core/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get(path: string, params: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest(this.http.get, path, params, authenticated)
  }

  post(path: string, params: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest(this.http.post, path, params, authenticated)
  }

  put(path: string, params: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest(this.http.put, path, params, authenticated)
  }

  delete(path: string, params: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest(this.http.delete, path, params, authenticated)
  }

  performRequest(method, path: string, params: any, authenticated: boolean): Observable<any> {
    return of(this.requestHeaders(authenticated)).pipe(
      map((headers) => ({ ...headers, params })),
      switchMap((options) => method(this.url(path), options)),
      catchError(error => {
        if (error.status === 401) {
          this.authService.logOut();
        }
        return error;
      })
    )
  }

  requestHeaders(authenticated: boolean = true): { headers: any } {
    const token = localStorage.getItem('authToken');
    return authenticated && token ? this.headers(token) : this.staticHeaders();
  }

  private url(path) {
    return `${this.apiRoot()}${path}`;
  }

  private apiRoot(): string {
    return `${environment.backendUrl}/api`;
  }

  private staticHeaders(): { headers: any } {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  }

  private headers(accessToken: string): { headers: any } {
    return {
      headers: {
        ...this.staticHeaders().headers,
        Authorization: `Bearer ${accessToken}`
      }
    };
  }
}
