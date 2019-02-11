import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@sonder/features/auth';

@Component({
  selector: 'sonder-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loggedIn$ = this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut().subscribe(() => this.router.navigate(['/login']));
  }
}
