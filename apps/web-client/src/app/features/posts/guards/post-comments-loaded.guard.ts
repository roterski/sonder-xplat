import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostCommentsLoadedGuard implements CanActivate {
  constructor() { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore(next.params.postId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(postId: number): Observable<boolean> {
    return of(true);
    // return this.store.select(getCommentsByPostLoaded(postId)).pipe(
    //   tap(loaded => {
    //     if (!loaded) {
    //       this.store.dispatch(new LoadPostComments({ postId }));
    //     }
    //   }),
    //   filter(loaded => loaded),
    //   take(1)
    // );
  }
}
