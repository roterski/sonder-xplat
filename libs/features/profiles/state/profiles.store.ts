import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialEntitiesState
} from '@datorama/akita';
import { Profile } from '../models/profile.model';

export interface ProfilesState extends EntityState<Profile> {}

const initialState = {
  ...getInitialEntitiesState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profiles' })
export class ProfilesStore extends EntityStore<ProfilesState, Profile> {
  constructor() {
    super(initialState);
  }
}
