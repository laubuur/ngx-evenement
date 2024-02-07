import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MessageService } from 'primeng/api';
import { httpInterceptor } from './interceptors/http.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor, errorInterceptor])), 
    provideAnimationsAsync(), 
    MessageService
  ]
};
