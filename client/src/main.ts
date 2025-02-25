import { bootstrapApplication } from '@angular/platform-browser';
import posthog from 'posthog-js';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

posthog.init('phc_QnagSpoMKm0iF0UJygWXiDWKBedCz6NYTheMd4tkZb7', {
  api_host: 'https://eu.i.posthog.com',
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
