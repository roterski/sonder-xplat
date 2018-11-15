import { Component } from '@angular/core';

import { PostsBaseComponent } from '@sonder/features';

@Component({
  selector: 'sonder-posts',
  templateUrl: 'posts.component.html'
})
export class PostsComponent extends PostsBaseComponent {
  constructor() {
    super();
  }
}
