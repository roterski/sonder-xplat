import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@sonder/features/auth';
import { LoginPageBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoginPageBaseComponent {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  logIn() {
    this.authService.logIn().subscribe(() => this.router.navigate(['/']));
  }
}
