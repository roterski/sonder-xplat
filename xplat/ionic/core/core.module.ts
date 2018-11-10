import { NgModule, Optional, SkipSelf } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { throwIfAlreadyLoaded } from '@sonder/utils';
import { SonderCoreModule } from '@sonder/web';

@NgModule({
  imports: [SonderCoreModule, IonicModule.forRoot()]
})
export class SonderIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: SonderIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'SonderIonicCoreModule');
  }
}
