import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookService } from 'ngx-facebook';

import { AuthModule as PlatformAuthModule } from '@sonder/ionic/features/auth';
import { LoginPageComponent } from '@sonder/ionic/features/auth/components';
import { UnauthenticatedGuard } from '@sonder/features/auth/guards';
import { SharedModule } from '../shared/shared.module';
import { AUTH_COMPONENTS, AuthComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), PlatformAuthModule],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
  providers: [FacebookService]
})
export class AuthModule {}
