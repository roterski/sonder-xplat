import { BaseComponent } from '@sonder/core';

export abstract class PostsBaseComponent extends BaseComponent {
  public text: string = 'Posts';

  constructor() {
    super();
  }
}
