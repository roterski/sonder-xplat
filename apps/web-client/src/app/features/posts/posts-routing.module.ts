import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PostsListPaginatedPageComponent,
  PostShowPageComponent,
  NewPostPageComponent
} from '@sonder/web/features/posts/containers';
import {
  PostsLoadedGuard,
  PostLoadedGuard,
  PostCommentsLoadedGuard
} from '@sonder/features/posts/guards';

export const postsRoutes: Routes = [
  {
    path: '',
    canActivate: [PostsLoadedGuard],
    component: PostsListPaginatedPageComponent
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
export class PostsRoutingModule {}
