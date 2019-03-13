// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// app
import { SharedModule } from './features/shared/shared.module';

import { AuthenticatedAppComponent } from '@sonder/web/features/ui/containers';
import {
  AuthenticatedGuard,
  UnauthenticatedGuard
} from '@sonder/features/auth/guards';
import { authRoutes } from './features/auth/auth-routing.module';
import { postsRoutes } from './features/posts/posts-routing.module';
import { profilesRoutes } from './features/profiles/profiles-routing.module';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticatedAppComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      },
      {
        path: 'posts',
        loadChildren: './features/posts/posts.module#PostsModule'
      },
      {
        path: 'profiles',
        loadChildren: './features/profiles/profiles.module#ProfilesModule'
      }
    ]
  },
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'login',
    canActivate: [UnauthenticatedGuard],
    loadChildren: './features/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })
  ]
})
export class AppRoutingModule {}
