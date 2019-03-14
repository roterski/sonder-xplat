import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileShowPageComponent } from '@sonder/web/features/profiles/containers';

export const profilesRoutes: Routes = [
  {
    path: ':profileId',
    component: ProfileShowPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(profilesRoutes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {}
