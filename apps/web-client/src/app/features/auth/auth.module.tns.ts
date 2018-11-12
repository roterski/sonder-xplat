import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { AuthenticatedGuard, UnauthenticatedGuard } from './guards';
import { environment } from '../../../environments/environment';

import * as application from 'application';

const nsFacebook = require('nativescript-facebook');

application.on(application.launchEvent, function (args) {
    nsFacebook.init(environment.facebookAppId);
});

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [LoginPageComponent],
    providers: [AuthenticatedGuard]
})
export class AuthModule { }
