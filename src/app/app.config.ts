import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; 
import { AuthInterceptor } from './Core/interceptor/Auth.Interceptor';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [ 
     provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }) 
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(HttpClientModule,RouterModule,BrowserAnimationsModule),
      provideHttpClient(withFetch()), 
      provideRouter(routes),
      BrowserAnimationsModule,
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimations(),
    provideToastr()
  ]
};
