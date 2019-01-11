import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Actions, Store } from '@ngxs/store';
import { AuthService, SignUp } from '@sonder/features/auth';
import { AuthBaseComponent } from '@sonder/features';
import * as _ from 'lodash';

@Component({
  selector: 'sonder-sign-up-page',
  templateUrl: 'sign-up-page.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignUpPageComponent extends AuthBaseComponent implements OnInit {
  signUpForm: FormGroup;
  errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store,
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
    this.store
      .dispatch(new SignUp(this.signUpForm.value))
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
