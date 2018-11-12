import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsLoadedGuard implements CanActivate {
  constructor() { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return of(true);
    // return this.store.select(getPostsLoaded).pipe(
    //   tap(loaded => {
    //     if (!loaded) {
    //       this.store.dispatch(new LoadPosts());
    //     }
    //   }),
    //   filter(loaded => loaded),
    //   take(1)
    // );
  }
}
