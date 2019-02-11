import { Injectable } from '@angular/core';
import { environment } from '@sonder/core/environments/environment';
import { Observable, from, of, bindNodeCallback } from 'rxjs';
import { map, exhaustMap, tap } from 'rxjs/operators';
import { LoginResponse, login as facebookLogin} from 'nativescript-facebook';
import { FacebookService } from '@sonder/features/auth';

@Injectable()
export class FacebookTnsService extends FacebookService {
  public authenticateFacebook(): Observable<string> {
    return bindNodeCallback(facebookLogin)().pipe(
      map((response) => response['token'])
    )
  }
};
