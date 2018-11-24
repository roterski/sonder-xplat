import { Component } from '@angular/core';

import { PostsListPageBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsListPageBaseComponent {
  constructor() {
    super();
  }
}
