import { Injectable, Inject } from '@angular/core';
import { parseValidationErrors } from '@sonder/utils';
import { Observable, zip, throwError } from 'rxjs';
import { pluck, map, tap, catchError, delay } from 'rxjs/operators';
import { ProfilesApiService } from './profiles-api.service';
import { Profile } from '../models';
import { ProfilesStore } from '../state';
import * as _ from 'lodash';

@Injectable(
  { providedIn: 'root' }
)
export class ProfilesService {
  constructor(
    private profilesApi: ProfilesApiService,
    private profilesStore: ProfilesStore
  ) {
  }

  loadProfiles(id: number[]): Observable<any> {
    return this.profilesApi
      .getProfiles({ id })
      .pipe(
        pluck('data'),
        tap((profiles: Profile[]) => this.profilesStore.set(profiles))
      );
  }
}
