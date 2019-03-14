import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap, switchMap, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Profile, ProfilesBaseComponent } from '@sonder/features/profiles';

import { ProfilesQuery, ProfilesService } from '@sonder/features/profiles';

@Component({
  selector: 'sonder-profile-show-page',
  templateUrl: './profile-show-page.component.html',
  styleUrls: ['./profile-show-page.component.scss']
})
export class ProfileShowPageComponent extends ProfilesBaseComponent
  implements OnInit {
  profile$: Observable<Profile>;

  constructor(
    private route: ActivatedRoute,
    private profilesQuery: ProfilesQuery,
    private profilesService: ProfilesService
  ) {
    super();
  }

  ngOnInit() {
    const profileId$ = this.route.params.pipe(
      map((params: { profileId: string }) => parseInt(params.profileId, 10)),
      takeUntil(this.destroy$)
    );

    this.profile$ = profileId$.pipe(
      switchMap((profileId: number) =>
        this.profilesQuery.selectEntity(profileId)
      )
    );

    profileId$
      .pipe(
        switchMap((profileId: number) =>
          this.profilesService.loadProfiles([profileId])
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
