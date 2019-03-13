import { NgModule } from '@angular/core';
import { ProfilesModule as SharedProfilesModule } from '@sonder/features';
import { UIModule } from '../ui/ui.module';
import { PROFILES_COMPONENTS } from './components';
import { PROFILES_CONTAINERS } from './containers';

@NgModule({
  imports: [SharedProfilesModule, UIModule],
  declarations: [...PROFILES_COMPONENTS, ...PROFILES_CONTAINERS],
  exports: [...PROFILES_COMPONENTS, ...PROFILES_CONTAINERS]
})
export class ProfilesModule {}
