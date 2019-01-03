import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@sonder/features/auth';
import { AuthBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-social-login-page',
  templateUrl: 'social-login-page.component.html',
  styleUrls: ['./social-login-page.component.css']
})
export class SocialLoginPageComponent extends AuthBaseComponent {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  logIn() {
    this.authService
      .facebookLogIn()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => this.router.navigate(['/']));
  }
}
