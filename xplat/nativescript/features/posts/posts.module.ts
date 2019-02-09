import { NgModule } from '@angular/core';
import { PostsModule as SharedPostsModule } from '@sonder/features';

import { UIModule } from '../ui/ui.module';
import { POSTS_COMPONENTS } from './components';
import { POSTS_CONTAINERS } from './containers';

@NgModule({
  imports: [SharedPostsModule, UIModule],
  declarations: [...POSTS_COMPONENTS, ...POSTS_CONTAINERS],
  exports: [...POSTS_COMPONENTS, ...POSTS_CONTAINERS]
})
export class PostsModule { }
