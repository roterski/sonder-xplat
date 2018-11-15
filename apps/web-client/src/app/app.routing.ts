// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// app
import { SharedModule } from './features/shared/shared.module';

import { AuthenticatedAppComponent } from './containers';
import { AuthenticatedGuard } from '@sonder/features/auth/guards';
import { authRoutes } from './features/auth/auth-routing.module';
import { postsRoutes } from './features/posts/posts-routing.module';

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
        // loadChildren: './features/posts/posts.module#PostsModule',
        children: postsRoutes
      },
      {
        path: 'profiles',
        loadChildren:
          './features/profile-pages/profile-pages.module#ProfilePagesModule'
      }
    ]
  },
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: './features/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
