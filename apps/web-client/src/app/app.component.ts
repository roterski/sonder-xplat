import { Component } from '@angular/core';

// xplat
import { AppBaseComponent } from '@sonder/web';

@Component({
  selector: 'sonder-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends AppBaseComponent {
  constructor() {
    super();
  }
}
