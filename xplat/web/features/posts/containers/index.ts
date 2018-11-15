import { PostsListPageComponent } from './posts-list-page/posts-list-page.component';
import { PostShowPageComponent } from './post-show-page/post-show-page.component';
import { NewPostPageComponent } from './new-post-page/new-post-page.component';
import { NewCommentFormComponent } from './new-comment-form/new-comment-form.component';

export const POSTS_CONTAINERS = [
  PostsListPageComponent,
  PostShowPageComponent,
  NewPostPageComponent,
  NewCommentFormComponent
];

export * from './posts-list-page/posts-list-page.component';
export * from './post-show-page/post-show-page.component';
export * from './new-post-page/new-post-page.component';
export * from './new-comment-form/new-comment-form.component';
