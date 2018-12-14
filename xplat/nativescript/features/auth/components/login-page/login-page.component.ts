import { Component } from '@angular/core';

import { BaseComponent } from '@sonder/core';

@Component({
  moduleId: module.id,
  selector: 'sonder-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent extends BaseComponent {
  constructor() {
    super();
  }
}
