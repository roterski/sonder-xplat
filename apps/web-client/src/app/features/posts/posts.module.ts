import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsApiService, VotesApiService, TagsApiService } from './services';
import {
  PostShowPageComponent,
  NewPostPageComponent,
  PostsListPageComponent } from './containers';
import {
  CommentTreeComponent,
  PostItemComponent,
  VoteButtonsComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { postsPaginatorProvider } from './state';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { NewCommentFormComponent } from './containers/new-comment-form/new-comment-form.component';
import { TagChipsComponent } from './components/tag-chips/tag-chips.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsListPageComponent,
    PostShowPageComponent,
    NewPostPageComponent,
    CommentTreeComponent,
    PostItemComponent,
    VoteButtonsComponent,
    CommentItemComponent,
    NewCommentFormComponent,
    TagChipsComponent
  ],
  entryComponents: [
    CommentItemComponent,
    NewCommentFormComponent
  ],
  providers: [
    PostsApiService,
    VotesApiService,
    TagsApiService,
    postsPaginatorProvider
  ]
})
export class PostsModule { }
