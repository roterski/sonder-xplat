import { Component } from '@angular/core';

import { BaseComponent } from '@sonder/core';

@Component({
  selector: 'sonder-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent extends BaseComponent {
  constructor() {
    super();
  }
}
