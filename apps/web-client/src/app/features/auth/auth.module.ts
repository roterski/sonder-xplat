import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthModule as AuthWebModule } from '@sonder/web/features/auth';
import { LogOutApolloService, LogOutService } from '@sonder/features/auth';

@NgModule({
  imports: [CommonModule, AuthWebModule, AuthRoutingModule],
  providers: [
    // { provide: LogOutService, useClass: LogOutApolloService },
    LogOutService,
  ]
})
export class AuthModule {}
