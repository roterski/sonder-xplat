import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private facebookService: FacebookService) {
    const params: InitParams = {
      version: 'v2.10',
      appId: environment.facebookAppId
    };
    facebookService.init(params);
  }

  facebookLogIn(): Observable<any> {
    return from(this.facebookService.getLoginStatus()).pipe(
      exhaustMap(data => data.status === 'connected' ? of(data) : from(this.facebookService.login())),
      map(data => data.authResponse.accessToken)
    );
  }
}
