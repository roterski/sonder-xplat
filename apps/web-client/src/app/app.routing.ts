// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// app
import { SharedModule } from './features/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/profiles',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'posts',
    loadChildren: './features/posts/posts.module#PostsModule'
  },
  {
    path: 'profiles',
    loadChildren:
      './features/profile-pages/profile-pages.module#ProfilePagesModule'
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
