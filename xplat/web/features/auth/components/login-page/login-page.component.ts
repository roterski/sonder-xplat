import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@sonder/features/auth';
import { AuthBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends AuthBaseComponent {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  logIn() {
    this.authService
      .logIn()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => this.router.navigate(['/']));
  }
}
