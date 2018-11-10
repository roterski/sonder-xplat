import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePagesModule as SharedProfilePagesModule } from '@sonder/features';

import { SharedModule } from '../shared/shared.module';
import { PROFILEPAGES_COMPONENTS, ProfilePagesComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePagesComponent
  }
];

@NgModule({
  imports: [
    SharedProfilePagesModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...PROFILEPAGES_COMPONENTS],
  exports: [...PROFILEPAGES_COMPONENTS]
})
export class ProfilePagesModule {}
