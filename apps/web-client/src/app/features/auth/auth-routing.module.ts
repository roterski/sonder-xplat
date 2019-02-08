import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInWithFacebookPageComponent, SignInPageComponent, SignUpPageComponent } from '@sonder/web/features/auth/components';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignInWithFacebookPageComponent
  },
  {
    path: 'sign-in',
    component: SignInPageComponent
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
