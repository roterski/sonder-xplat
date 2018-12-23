import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorInterceptor } from './http-error.interceptor';
@NgModule({
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
