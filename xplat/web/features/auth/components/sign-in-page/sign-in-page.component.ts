import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
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
  selector: 'sonder-sign-in-page',
  templateUrl: 'sign-in-page.component.html',
  styleUrls: ['../social-login-page/social-login-page.component.css']
})
export class SignInPageComponent extends AuthBaseComponent implements OnInit {
  signInForm: FormGroup;
  errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signIn() {
    this.authService
      .signIn(this.signInForm.value)
      .pipe(
        takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/'])
    }, (error) => {
      if (error.status === 409) {
        this.errors = { email: _.get(error, 'error.message') }
      } else {
        this.errors = true
      }
    });
  }
}
