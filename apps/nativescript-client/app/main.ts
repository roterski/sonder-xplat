// https://github.com/NativeScript/nativescript-dev-webpack/issues/660#issuecomment-422711983
import 'reflect-metadata';
import 'nativescript-localstorage';
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppOptions } from 'nativescript-angular/platform-common';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import {
  enableAkitaProdMode,
  persistState,
  akitaConfig
} from '@datorama/akita';
import { environment } from '@sonder/core';

// If built with env.uglify
declare const __UGLIFIED__;
if (typeof __UGLIFIED__ !== 'undefined' && __UGLIFIED__) {
  require('@angular/core').enableProdMode();
}

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

akitaConfig({
  resettable: true
});

persistState({ include: ['session'] });

let options: AppOptions = {};
if (module['hot']) {
  // attach to livesync hooks and perform navigation
  require('@sonder/nativescript').attachLivesyncNavigation();

  const hmrUpdate = require('nativescript-dev-webpack/hmr').hmrUpdate;

  options.hmrOptions = {
    moduleTypeFactory: () => AppModule,
    livesyncCallback: platformReboot => {
      console.log('HMR: Sync...');
      hmrUpdate();
      setTimeout(platformReboot, 0);
    }
  };
  hmrUpdate();

  module['hot'].accept(['./app.module']);
}

platformNativeScriptDynamic(options).bootstrapModule(AppModule);
