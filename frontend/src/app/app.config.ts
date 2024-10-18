import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      ToastrModule.forRoot({ // Configura ToastrModule
        positionClass: 'toast-top-left', // Posición de las notificaciones
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
      }),
      BrowserAnimationsModule // Asegúrate de incluir este módulo
    )
  ]
};
