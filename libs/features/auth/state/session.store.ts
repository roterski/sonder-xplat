import { Injectable } from '@angular/core';
import { Store, StoreConfig, action } from '@datorama/akita';

export interface SessionState {
  backendAuthToken: string;
}

export function createInitialState(): SessionState {
  return {
    backendAuthToken: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }

  @action('Sign In')
  authenticateBackend(backendAuthToken: string): void {
    this.update({ backendAuthToken });
  }
}
