import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthModule as SharedAuthModule } from '@sonder/features';
import { UIModule } from '../ui/ui.module';
import { AUTH_COMPONENTS } from './components';
import { AUTH_PROVIDERS } from './services';

@NgModule({
  imports: [SharedAuthModule, UIModule],
  declarations: [...AUTH_COMPONENTS],
  exports: [...AUTH_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...AUTH_PROVIDERS]
})
export class AuthModule {}
