import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import posthog from 'posthog-js';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  title = 'angular-spa';

  navigationEnd: Observable<NavigationEnd>;

  constructor(public router: Router) {
    this.navigationEnd = router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navigationEnd.subscribe((event: NavigationEnd) => {
      posthog.capture('$pageview', { page: event.url });
    });
  }
}
