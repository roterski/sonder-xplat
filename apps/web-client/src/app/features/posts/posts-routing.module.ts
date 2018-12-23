import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PostsListPageComponent,
  PostShowPageComponent,
  NewPostPageComponent
} from '@sonder/web/features/posts/containers';

export const postsRoutes: Routes = [
  {
    path: '',
    component: PostsListPageComponent
  },
  {
    path: 'new',
    component: NewPostPageComponent
  },
  {
    path: ':postId',
    component: PostShowPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
