import { Injectable } from '@angular/core';
import { environment } from '@sonder/core/environments/environment';
import { Observable, from, of } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';

import { FacebookService } from '@sonder/features/auth';

@Injectable()
export class FacebookTnsService extends FacebookService {
  public authenticateFacebook(): Observable<string> {
    // debugger;
    return of('bob');
  }
}
