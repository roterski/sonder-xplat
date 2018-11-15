import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { PostsApiService, VotesApiService, TagsApiService } from '@sonder/features/posts/services';
import { postsPaginatorProvider } from '@sonder/features/posts/state';
import {
  POSTS_COMPONENTS,
  POSTS_CONTAINERS,
  CommentItemComponent,
  NewCommentFormComponent
} from '@sonder/web/features/posts';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule],
  declarations: [
    ...POSTS_COMPONENTS,
    ...POSTS_CONTAINERS
  ],
  exports: [
    ...POSTS_COMPONENTS,
    ...POSTS_CONTAINERS
  ],
  entryComponents: [CommentItemComponent, NewCommentFormComponent],
  providers: [
    PostsApiService,
    VotesApiService,
    TagsApiService,
    postsPaginatorProvider
  ]
})
export class PostsModule {}
