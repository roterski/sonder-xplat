import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialEntitiesState
} from '@datorama/akita';
import { Profile } from '../models/profile.model';

export interface ProfilesState extends EntityState<Profile> {
  myProfiles: number[];
}

const initialState = {
  ...getInitialEntitiesState(),
  myProfiles: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profiles' })
export class ProfilesStore extends EntityStore<ProfilesState, Profile> {
  constructor() {
    super(initialState);
  }
}
