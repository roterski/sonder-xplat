import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookService } from 'ngx-facebook';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from '@sonder/web/features/auth/components';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthenticatedGuard,
  UnauthenticatedGuard
} from '@sonder/features/auth/guards';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
  providers: [FacebookService, AuthenticatedGuard]
})
export class AuthModule {}
