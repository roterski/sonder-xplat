import { BaseComponent } from '@sonder/core';

export abstract class AuthBaseComponent extends BaseComponent {
  public text: string = 'Auth';

  constructor() {
    super();
  }
}
