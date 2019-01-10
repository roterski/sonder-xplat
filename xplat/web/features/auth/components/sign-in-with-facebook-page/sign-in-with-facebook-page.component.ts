import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@sonder/features/auth';
import { AuthBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-sign-in-with-facebook-page',
  templateUrl: 'sign-in-with-facebook-page.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignInWithFacebookPageComponent extends AuthBaseComponent {
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
