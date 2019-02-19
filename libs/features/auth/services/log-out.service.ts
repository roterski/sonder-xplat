import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { resetStores } from '@datorama/akita';
// import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {
  constructor(
    // private apollo: Apollo
  ) {
  }

  logOut(): Observable<boolean> {
    debugger
    resetStores();
    return of(true);
    // return from(this.apollo.getClient().resetStore()).pipe(
    //   tap(() => resetStores()),
    //   switchMap(() => of(true))
    // );
  }
}
