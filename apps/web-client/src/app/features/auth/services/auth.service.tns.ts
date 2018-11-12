import { Injectable, OnInit } from '@angular/core';
import * as Facebook from 'nativescript-facebook';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap} from 'rxjs/operators';
import { bindNodeCallback } from 'rxjs/internal/observable/bindNodeCallback';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  facebookLogIn(): Observable<any> {
    return bindNodeCallback(Facebook.login)().pipe(
      map(data => data['token'])
    );
  }
}
