import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { Observable } from 'rxjs';
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  isLoggedIn$: Observable<boolean> = this.select(state => toBoolean(state.backendAuthToken));
  backendToken$: Observable<string> = this.select((state: SessionState) => state.backendAuthToken);

  constructor(protected store: SessionStore) {
    super(store);
  }

  isLoggedIn() {
    return toBoolean(this.getSnapshot().backendAuthToken);
  }
}
