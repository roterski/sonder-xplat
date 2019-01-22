import { Injectable } from '@angular/core';
import { FacebookService as NgxFacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { environment } from '@sonder/core/environments/environment';
import { Observable, from, of } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';

import { FacebookService } from '@sonder/features/auth';

@Injectable()
export class FacebookWebService extends FacebookService {
  constructor(
    private facebookService: NgxFacebookService,
  ) {
    super();
    const params: InitParams = {
      version: 'v2.10',
      appId: environment.facebookAppId
    };
    facebookService.init(params);
  }
  public authenticateFacebook(): Observable<string> {
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
