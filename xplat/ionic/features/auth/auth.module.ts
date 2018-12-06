import { NgModule } from '@angular/core';
import { AuthModule as SharedAuthModule } from '@sonder/features';

import { UIModule } from '../ui/ui.module';
import { AUTH_COMPONENTS } from './components';

@NgModule({
  imports: [SharedAuthModule, UIModule],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS]
})
export class AuthModule {}
