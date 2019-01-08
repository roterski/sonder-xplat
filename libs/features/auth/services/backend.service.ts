import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  tap,
  catchError,
  switchMap
} from 'rxjs/operators';
import { environment } from '@sonder/core/environments/environment';
import { LogOutService } from './log-out.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private logOutService: LogOutService
  ) {}

  get(path: string, params: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest((url: string, headers: { headers: any }) => (
      this.http.get(url, { ...headers, params })
    ), path, authenticated)
  }

  post(path: string, data: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest((url: string, headers: { headers: any }) => (
      this.http.post(url, data, headers)
    ), path, authenticated)
  }

  put(path: string, data: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest((url: string, headers: { headers: any }) => (
      this.http.put(url, data, headers)
    ), path, authenticated)
  }

  delete(path: string, params: any = {}, authenticated: boolean = true): Observable<any> {
    return this.performRequest((url: string, headers: { headers: any }) => (
      this.http.get(url, { ...headers, params })
    ), path, authenticated)
  }

  performRequest(method, path: string, authenticated: boolean): Observable<any> {
    return of(this.requestHeaders(authenticated)).pipe(
      switchMap((headers) => method(this.url(path), headers)),
      catchError(error => {
        if (error.status === 401) {
          this.logOutService.logOut();
        }
        throw(error);
      })
    )
  }

  requestHeaders(authenticated: boolean = true): { headers: any } {
    const token = localStorage.getItem('authToken');
    return authenticated && token ? this.headers(token) : this.staticHeaders();
  }

  private url(path) {
    return `${this.apiRoot()}/${path}`;
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
