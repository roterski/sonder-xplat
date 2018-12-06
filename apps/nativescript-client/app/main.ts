// https://github.com/NativeScript/nativescript-dev-webpack/issues/660#issuecomment-422711983
import 'reflect-metadata';
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
// https://github.com/nativescript-vue/nativescript-vue/issues/255#issuecomment-408035243
import * as application from 'tns-core-modules/application';

// If built with env.uglify
if (global['UGLIFIED']) {
  enableProdMode();
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
