import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import {
  PostsApiService,
  VotesApiService,
  TagsApiService
} from '@sonder/features/posts/services';
import {
  POSTS_COMPONENTS,
  POSTS_CONTAINERS,
  CommentItemComponent,
  NewCommentFormComponent
} from '@sonder/web/features/posts';

import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ],
  declarations: [...POSTS_COMPONENTS, ...POSTS_CONTAINERS],
  exports: [...POSTS_COMPONENTS, ...POSTS_CONTAINERS],
  entryComponents: [CommentItemComponent, NewCommentFormComponent],
  providers: [
    PostsApiService,
    VotesApiService,
    TagsApiService,
  ]
})
export class PostsModule {}
