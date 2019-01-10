import { AuthComponent } from './auth/auth.component';
import { SignInWithFacebookPageComponent } from './sign-in-with-facebook-page/sign-in-with-facebook-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

export const AUTH_COMPONENTS = [
  AuthComponent,
  SignInWithFacebookPageComponent,
  SignInPageComponent,
  SignUpPageComponent
];

export * from './auth/auth.component';
export * from './sign-in-with-facebook-page/sign-in-with-facebook-page.component';
export * from './sign-in-page/sign-in-page.component';
export * from './sign-up-page/sign-up-page.component';
