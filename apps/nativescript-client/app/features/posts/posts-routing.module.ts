import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import {
  PostsListPageComponent,
  // PostShowPageComponent,
  // NewPostPageComponent
} from '@sonder/nativescript/features/posts/containers';

export const postsRoutes: Routes = [
  {
    path: '',
    component: PostsListPageComponent
  },
  // {
  //   path: 'new',
  //   component: NewPostPageComponent
  // },
  // {
  //   path: ':postId',
  //   component: PostShowPageComponent
  // }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(postsRoutes)],
  exports: [NativeScriptRouterModule]
})
export class PostsRoutingModule {}
