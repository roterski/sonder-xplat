import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery, SessionState, SessionService } from '@sonder/features/auth/state';

@Component({
  selector: 'sonder-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn$ = this.sessionQuery.isLoggedIn$;
  }

  logOut() {
    this.sessionService.logOut();
    this.router.navigate(['/login']);
  }
}
