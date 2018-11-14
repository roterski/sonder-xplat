import { Injectable } from '@angular/core';
import { Store, StoreConfig, applyAction } from '@datorama/akita';

export interface SessionState {
  facebookAccessToken: string;
  backendAuthToken: string;
}

export function createInitialState(): SessionState {
  return {
    facebookAccessToken: null,
    backendAuthToken: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  authenticateFacebook(facebookAccessToken: string) {
    applyAction(() => this.update({ facebookAccessToken }),
      { type: 'Facebook Authenticated' });
  }

  authenticateBackend(backendAuthToken: string) {
    applyAction(() => this.update({ backendAuthToken }),
      { type: 'Logged In'});
  }

  logOut() {
    applyAction(() => this.setState((state) => {
      return createInitialState();
    }),
      { type: 'Logged Out' });
  }
}
