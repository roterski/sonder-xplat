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
import {
  PostsService,
  PostsApolloService,
  PostsAkitaService
} from '@sonder/features/posts';
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
  providers: [{ provide: PostsService, useClass: PostsAkitaService }]
})
export class PostsModule {}
