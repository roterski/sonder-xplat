import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  enableAkitaProdMode,
  persistState,
  akitaConfig
} from '@datorama/akita';
import 'hammerjs';

// libs
import { environment } from './environments/environment';

// app
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

akitaConfig({
  resettable: true
});

persistState({ include: ['session'] });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
