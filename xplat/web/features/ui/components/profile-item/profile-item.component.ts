import { Component, Input } from '@angular/core';
import { Profile } from '@sonder/features/profiles/models';

@Component({
  selector: 'sonder-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss']
})
export class ProfileItemComponent {
  @Input() profile: Profile;

  constructor() {}
}
