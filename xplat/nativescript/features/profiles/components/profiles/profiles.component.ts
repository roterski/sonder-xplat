import { Component } from '@angular/core';

import { BaseComponent } from '@sonder/core';

@Component({
  moduleId: module.id,
  selector: 'sonder-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent extends BaseComponent {

  constructor() {
    super();
  }
}