import { Component, Input } from '@angular/core';
import { Profile } from '@sonder/features/profiles/models';

@Component({
  selector: 'sonder-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() profile: Profile;

  constructor() {}
}
