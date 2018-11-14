import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.sessionService.logIn().subscribe(() => this.router.navigate(['/']));
  }
}
