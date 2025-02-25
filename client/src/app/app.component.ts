import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import posthog from 'posthog-js';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DemoSidebar } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'ob-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    DemoSidebar,
    MainLayoutComponent,
    MatIconModule,
    MatSidenavModule,
  ],
  template: `
    <ob-demo-sidebar>
      <ob-main-layout>
        <router-outlet></router-outlet>
      </ob-main-layout>
    </ob-demo-sidebar>
  `,
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
