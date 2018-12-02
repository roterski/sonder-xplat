import { NgModule } from '@angular/core';
import { StateManagementModule as SharedStateManagementModule } from '@sonder/features';
import { UIModule } from '../ui/ui.module';

@NgModule({
  imports: [
    SharedStateManagementModule,UIModule
  ],
})
export class StateManagementModule {}

