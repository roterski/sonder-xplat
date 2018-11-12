import { Injectable, Inject } from '@angular/core';
import { SessionStore } from './session.store';
import { AuthService, BackendService } from '../services';
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ClearStoresService, POSTS_PAGINATOR } from '../../posts/state';
import { Post } from '../../posts/models';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(
    private sessionStore: SessionStore,
    private authService: AuthService,
    private backendService: BackendService,
    @Inject(POSTS_PAGINATOR) private paginatorRef: PaginatorPlugin<Post>,
    private clearStoresService: ClearStoresService) {
  }

  logIn(): Observable<boolean> {
    return this.authService.facebookLogIn().pipe(
      tap((facebookToken: string) => this.sessionStore.authenticateFacebook(facebookToken)),
      exhaustMap((facebookToken: string) => {
        return this.backendService.authenticate(facebookToken).pipe(
          tap((backendToken: string) => this.sessionStore.authenticateBackend(backendToken)),
          map(() => true)
        );
      }),
      catchError((error) => of(false))
    );
  }

  logOut() {
    this.paginatorRef.clearCache();
    this.sessionStore.logOut();
    this.clearStoresService.clearStores();
  }

}
