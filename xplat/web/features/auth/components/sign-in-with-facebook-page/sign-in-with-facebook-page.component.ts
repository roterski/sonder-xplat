import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, tap, catchError } from 'rxjs/operators';

import { AuthService } from '@sonder/features/auth';
import { AuthBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-sign-in-with-facebook-page',
  templateUrl: 'sign-in-with-facebook-page.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignInWithFacebookPageComponent extends AuthBaseComponent
  implements OnInit {
  logInButtonClicks$ = new Subject<Event>();
  errors: any;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.handleLogIn();
  }

  handleLogIn() {
    this.logInButtonClicks$
      .pipe(
        tap(() => this.errors = undefined),
        switchMap(() => this.authService.facebookLogIn()),
        catchError((error, caught$) => {
          this.errors = error;
          return caught$;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigate(['/']));
  }
}
