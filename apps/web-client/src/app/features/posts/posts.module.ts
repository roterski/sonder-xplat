import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {
  POSTS_COMPONENTS,
  POSTS_CONTAINERS,
  CommentItemComponent,
  NewCommentFormComponent
} from '@sonder/web/features/posts';
import { ProfileComponent } from '@sonder/web/features/profiles';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ],
  declarations: [...POSTS_COMPONENTS, ...POSTS_CONTAINERS, ProfileComponent],
  exports: [...POSTS_COMPONENTS, ...POSTS_CONTAINERS, ProfileComponent],
  entryComponents: [CommentItemComponent, NewCommentFormComponent],
  providers: []
})
export class PostsModule {}
