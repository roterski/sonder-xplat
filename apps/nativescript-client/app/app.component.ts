import { Component } from '@angular/core';

// libs
import { AppBaseComponent, AppService } from '@sonder/nativescript';

@Component({
  selector: 'sonder-root',
  template: `
  <page-router-outlet></page-router-outlet>`
})
export class AppComponent extends AppBaseComponent {
  constructor(appService: AppService) {
    super(appService);
  }
}
