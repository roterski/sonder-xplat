import { Observable, of, from } from 'rxjs';
import { resetStores } from '@datorama/akita';

export class LogOutService {
  constructor(
  ) {
  }

  logOut(): Observable<boolean> {
    resetStores();
    return of(true);
  }
}
