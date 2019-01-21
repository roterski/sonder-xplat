import { Component } from '@angular/core';

// libs
import { BaseComponent } from '@sonder/core';
import { AppService } from '@sonder/nativescript/core';

export abstract class AppBaseComponent extends BaseComponent {
  constructor(protected appService: AppService) {
    super();
  }
}
