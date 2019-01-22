import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthModule as AuthWebModule } from '@sonder/web/features/auth';

@NgModule({
  imports: [
    CommonModule,
    AuthWebModule,
    AuthRoutingModule,
  ]
})
export class AuthModule {}
