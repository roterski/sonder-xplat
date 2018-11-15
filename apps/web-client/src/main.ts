import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';

// libs
import { environment } from '@sonder/core';

// app
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

persistState({ include: ['session'] });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
