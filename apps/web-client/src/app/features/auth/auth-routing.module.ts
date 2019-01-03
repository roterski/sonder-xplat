import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialLoginPageComponent, SignInPageComponent, SignUpPageComponent } from '@sonder/web/features/auth/components';
import { UnauthenticatedGuard } from '@sonder/features/auth/guards';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SocialLoginPageComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
