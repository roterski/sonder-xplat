import { NgModule } from '@angular/core';
import { AuthModule as SharedAuthModule } from '@sonder/features';
import { FacebookService as NgxFacebookService } from 'ngx-facebook';

import { UIModule } from '../ui/ui.module';
import { AUTH_COMPONENTS } from './components';
import { AUTH_PROVIDERS } from './services';

@NgModule({
  imports: [SharedAuthModule, UIModule],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
  providers: [...AUTH_PROVIDERS, NgxFacebookService]
})
export class AuthModule {}
