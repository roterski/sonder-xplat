import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { resetStores } from '@datorama/akita';
import { LogOutService } from './log-out.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutApolloService extends LogOutService {
  constructor(private apollo: Apollo, router: Router) {
    super(router);
  }

  logOut(): Observable<boolean> {
    return from(this.apollo.getClient().resetStore()).pipe(
      tap(() => resetStores()),
      switchMap(() => from(this.router.navigate(['/login'])))
    );
  }
}
