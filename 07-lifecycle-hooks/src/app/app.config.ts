import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Habilitar señales
    provideZonelessChangeDetection(),
    // HashStrategy (Para despliegue)
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
};
