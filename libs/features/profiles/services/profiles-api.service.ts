import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Profile } from '../models';
import { BackendService } from '@sonder/features/auth/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesApiService {
  constructor(private backend: BackendService) {}

  getProfiles(params: any = {}): Observable<Profile[]> {
    return this.backend.get('/profiles', params).pipe(pluck('data'));
  }

  getMyProfiles(params: any = {}): Observable<Profile[]> {
    return this.backend.get('/profiles/my', params).pipe(pluck('data'));
  }
}
