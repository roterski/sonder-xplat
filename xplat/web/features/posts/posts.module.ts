import { NgModule } from '@angular/core';
import { PostsModule as SharedPostsModule } from '@sonder/features';

import { UIModule } from '../ui/ui.module';
import { POSTS_COMPONENTS } from './components';

@NgModule({
  imports: [SharedPostsModule, UIModule],
  declarations: [...POSTS_COMPONENTS],
  exports: [...POSTS_COMPONENTS]
})
export class PostsModule {}
