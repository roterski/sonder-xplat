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
  selector: 'sonder-sign-up-page',
  templateUrl: 'sign-up-page.component.html',
  styleUrls: ['../social-login-page/social-login-page.component.css']
})
export class SignUpPageComponent extends AuthBaseComponent implements OnInit {
  signUpForm: FormGroup;
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
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp() {
    this.authService
      .signUp(this.signUpForm.value)
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
