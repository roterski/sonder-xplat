import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthStateModel, SignOut } from '@sonder/features/auth';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'sonder-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit {
  @Select((state: AuthStateModel) => state.loggedIn) loggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
  }

  logOut() {
    this.store
      .dispatch(new SignOut())
      .subscribe(() => this.router.navigate(['/login']))
  }
}
