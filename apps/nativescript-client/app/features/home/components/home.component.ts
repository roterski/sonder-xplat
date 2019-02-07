import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from '@sonder/features/auth';

import { BaseComponent } from '@sonder/core';

@Component({
  moduleId: module.id,
  selector: 'sonder-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BaseComponent {
  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {
    super();
  }

  logOut() {
    this.authService.logOut().subscribe(() => this.routerExtensions.navigate(['/login'], { clearHistory: true }));
  }
}
