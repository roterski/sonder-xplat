import { Component } from '@angular/core';

import { AuthBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent extends AuthBaseComponent {
  constructor() {
    super();
  }
}
