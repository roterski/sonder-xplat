import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookService } from 'ngx-facebook';
import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_COMPONENTS } from '@sonder/web/features/auth/components';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthenticatedGuard,
  UnauthenticatedGuard,
  AuthState
} from '@sonder/features';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([AuthState]),
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
  providers: [FacebookService, AuthenticatedGuard]
})
export class AuthModule {}
