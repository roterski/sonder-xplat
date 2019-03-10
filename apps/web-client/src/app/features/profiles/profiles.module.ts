import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesModule as ProfilesWebModule, PROFILES_COMPONENTS } from '@sonder/web/features/profiles';
// import { ProfilesService } from '@sonder/features/profiles';

@NgModule({
  imports: [CommonModule, ProfilesWebModule],
  // declarations: [...PROFILES_COMPONENTS],
  // exports: [...PROFILES_COMPONENTS],
  providers: [

  ]
})
export class ProfilesModule {}
