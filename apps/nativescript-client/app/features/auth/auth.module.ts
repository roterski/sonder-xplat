import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent, AuthModule as AuthTnsModule } from '@sonder/nativescript/features/auth';
import { UnauthenticatedGuard } from '@sonder/features/auth/guards';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent,
    // canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [SharedModule, AuthTnsModule, NativeScriptRouterModule.forChild(authRoutes)],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
