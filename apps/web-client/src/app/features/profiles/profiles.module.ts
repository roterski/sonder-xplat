import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProfilesModule as ProfilesWebModule,
  PROFILES_COMPONENTS
} from '@sonder/web/features/profiles';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfilesWebModule,
    ProfilesRoutingModule
  ],
  declarations: [...PROFILES_COMPONENTS],
  exports: [...PROFILES_COMPONENTS],
  providers: []
})
export class ProfilesModule {}
