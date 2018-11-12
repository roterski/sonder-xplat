import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostLoadedGuard implements CanActivate {
  constructor() { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(next.params.postId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(postId: number): Observable<boolean> {
    return of(true);
    // return this.store.select(selectPostByPostId(postId)).pipe(
    //   tap(loaded => {
    //     if (!loaded) {
    //       this.store.dispatch(new LoadPost({ postId: postId }));
    //     }
    //   }),
    //   filter(loaded => loaded),
    //   take(1)
    // );
  }
}
