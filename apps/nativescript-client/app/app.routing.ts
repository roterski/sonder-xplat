// angular
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// app
import { SharedModule } from './features/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '~/features/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: '~/features/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}

