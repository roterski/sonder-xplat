import { Component } from '@angular/core';

import { LoginPageBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-login-page',
  templateUrl: 'login-page.component.html'
})
export class LoginPageComponent extends LoginPageBaseComponent {
  constructor() {
    super();
  }
}
