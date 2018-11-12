import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListPageComponent, PostShowPageComponent, NewPostPageComponent } from './containers';
import { PostsLoadedGuard, PostLoadedGuard, PostCommentsLoadedGuard } from './guards';

export const postsRoutes: Routes = [
  {
    path: '',
    canActivate: [PostsLoadedGuard],
    component: PostsListPageComponent
  },
  {
    path: 'new',
    component: NewPostPageComponent
  },
  {
    path: ':postId',
    canActivate: [PostLoadedGuard, PostCommentsLoadedGuard],
    component: PostShowPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
