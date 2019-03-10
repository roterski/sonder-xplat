import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProfilesStore, ProfilesState } from './profiles.store';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfilesQuery extends QueryEntity<ProfilesState, Profile> {
  constructor(protected store: ProfilesStore) {
    super(store);
  }
}
