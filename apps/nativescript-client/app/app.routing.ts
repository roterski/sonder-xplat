// angular
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { SharedModule } from './features/shared/shared.module';
import {
  AuthenticatedGuard,
  UnauthenticatedGuard
} from '@sonder/features/auth/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    canActivate: [AuthenticatedGuard],
    loadChildren: './features/posts/posts.module#PostsModule'
  },
  {
    path: 'home',
    canActivate: [AuthenticatedGuard],
    loadChildren: '~/features/home/home.module#HomeModule'
  },
  {
    path: 'login',
    canActivate: [UnauthenticatedGuard],
    loadChildren: '~/features/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [SharedModule, NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
