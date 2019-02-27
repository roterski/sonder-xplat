import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { AuthService } from '@sonder/features/auth';
import { AuthBaseComponent } from '@sonder/features';
import * as _ from 'lodash';

@Component({
  selector: 'sonder-sign-up-page',
  templateUrl: 'sign-up-page.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignUpPageComponent extends AuthBaseComponent implements OnInit {
  signUpButtonClicks$ = new Subject<Event>();
  signUpForm: FormGroup;
  errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.handleSignUp();
  }

  createForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  handleSignUp() {
    this.signUpButtonClicks$
      .pipe(
        switchMap(() => this.authService.signUp(this.signUpForm.value)),
        catchError((error, caught$) => {
          this.errors = error.status === 409 ? { email: _.get(error, 'error.message') } : true;
          return caught$;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigate(['/']));
  }
}
