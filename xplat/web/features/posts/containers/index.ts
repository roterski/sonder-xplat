import { PostShowPageComponent } from './post-show-page/post-show-page.component';
import { NewPostPageComponent } from './new-post-page/new-post-page.component';
import { NewCommentFormComponent } from './new-comment-form/new-comment-form.component';
import { PostsListPageComponent } from './posts-list-page/posts-list-page.component';
import { PostsListPageApolloComponent } from './posts-list-page-apollo/posts-list-page-apollo.component';

export const POSTS_CONTAINERS = [
  PostShowPageComponent,
  NewPostPageComponent,
  NewCommentFormComponent,
  PostsListPageComponent,
  PostsListPageApolloComponent
];

export * from './post-show-page/post-show-page.component';
export * from './new-post-page/new-post-page.component';
export * from './new-comment-form/new-comment-form.component';
export * from './posts-list-page/posts-list-page.component';
export * from './posts-list-page-apollo/posts-list-page-apollo.component';
