import { Observable, of, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { resetStores } from '@datorama/akita';
import { LogOutService } from './log-out.service';

export class ApolloLogOutService extends LogOutService {
  constructor(
    private apollo: Apollo
  ) {
    super();
  }

  logOut(): Observable<boolean> {
    return from(this.apollo.getClient().resetStore()).pipe(
      tap(() => resetStores()),
      switchMap(() => of(true))
    );
  }
}
