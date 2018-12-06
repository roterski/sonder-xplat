import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from '@sonder/core';
import { SessionService } from '@sonder/features/auth';
import { LoginPageBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-login-page',
  templateUrl: 'login-page.component.html'
})
export class LoginPageComponent extends LoginPageBaseComponent {
  constructor(private sessionService: SessionService, private router: Router) {
    super();
  }

  logIn() {
    this.sessionService.logIn().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
