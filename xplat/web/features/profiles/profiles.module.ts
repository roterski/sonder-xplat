import { NgModule } from '@angular/core';
import { ProfilesModule as SharedProfilesModule } from '@sonder/features';
import { UIModule } from '../ui/ui.module';
import { PROFILES_COMPONENTS } from './components';

@NgModule({
  imports: [SharedProfilesModule, UIModule],
  declarations: [...PROFILES_COMPONENTS],
  exports: [...PROFILES_COMPONENTS]
})
export class ProfilesModule {}
