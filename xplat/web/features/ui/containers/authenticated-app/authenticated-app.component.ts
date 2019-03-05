import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@sonder/features/auth';
import { AppBaseComponent } from '@sonder/web/core';

@Component({
  selector: 'sonder-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent extends AppBaseComponent
  implements OnInit {
  public loggedIn$: Observable<boolean>;
  logOutButtonClicks$ = new Subject<Event>();

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.loggedIn$ = this.authService.isLoggedIn();
    this.handleLogOut();
  }

  handleLogOut() {
    this.logOutButtonClicks$
      .pipe(
        switchMap(() => this.authService.logOut()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
