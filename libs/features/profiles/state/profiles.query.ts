import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { switchMap } from 'rxjs/operators';
import { ProfilesStore, ProfilesState } from './profiles.store';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfilesQuery extends QueryEntity<ProfilesState, Profile> {
  constructor(protected store: ProfilesStore) {
    super(store);
  }

  selectMyProfiles() {
    return this.select('myProfiles').pipe(
      switchMap(ids => this.selectMany(ids))
    );
  }
}
