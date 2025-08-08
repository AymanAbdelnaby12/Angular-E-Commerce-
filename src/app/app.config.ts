import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ShortTitlePipe } from './Shared/pipe/short-title-pipe';

export const appConfig: ApplicationConfig = {
  providers: [ 
     provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }) // 👈 هنا
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(HttpClientModule),
      provideHttpClient(withFetch()), 
  ]
};
