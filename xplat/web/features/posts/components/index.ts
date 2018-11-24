import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentTreeComponent } from './comment-tree/comment-tree.component';
import { PostItemComponent } from './post-item/post-item.component';
import { TagChipsComponent } from './tag-chips/tag-chips.component';
import { VoteButtonsComponent } from './vote-buttons/vote-buttons.component';
import { PostsListPageComponent } from './posts-list-page/posts-list-page.component';

export const POSTS_COMPONENTS = [
  CommentItemComponent,
  CommentTreeComponent,
  PostItemComponent,
  TagChipsComponent,
  VoteButtonsComponent,
  PostsListPageComponent
];

export * from './comment-item/comment-item.component';
export * from './comment-tree/comment-tree.component';
export * from './post-item/post-item.component';
export * from './tag-chips/tag-chips.component';
export * from './vote-buttons/vote-buttons.component';
export * from './posts-list-page/posts-list-page.component';
