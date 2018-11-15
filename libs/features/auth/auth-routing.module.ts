import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { UnauthenticatedGuard } from './guards';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
