import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsModule as PostsTnsModule } from '@sonder/nativescript/features/posts';

@NgModule({
  imports: [SharedModule, PostsTnsModule, PostsRoutingModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PostsModule {}
