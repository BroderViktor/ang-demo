import { Injectable } from '@angular/core';
import posthog from 'posthog-js';

@Injectable({
  providedIn: 'root',
})
export class UserInsightService {
  private posthog = posthog;

  trackEvent(eventName: string, properties?: Record<string, unknown>) {
    this.posthog.capture(eventName, properties);
  }
}
