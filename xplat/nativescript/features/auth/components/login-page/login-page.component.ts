import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { BaseComponent } from '@sonder/core';
import { takeUntil} from 'rxjs/operators';

import { AuthService } from '@sonder/features/auth';

@Component({
  moduleId: module.id,
  selector: 'sonder-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent extends BaseComponent {
  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {
    super();
  }

  logIn() {
    this.authService
      .facebookLogIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.routerExtensions.navigate(['/'], { clearHistory: true }));
  }
}
