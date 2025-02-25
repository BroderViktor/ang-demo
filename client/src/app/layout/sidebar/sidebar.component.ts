import { MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RoutePath, routePaths } from '../../appRouteTypes';
import { LocaleSelectorComponent } from '../../language/locale-selector.component';
import { TranslatePipe } from '../../language/translation/translate.pipe';

interface MenuItem {
  route: RoutePath;
  label: string;
  icon: string;
}

@Component({
  selector: 'ob-demo-sidebar',
  templateUrl: 'sidebar.component.html',
  styles: `
    .mat-drawer {
      width: 240px;
    }
  `,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    TranslatePipe,
    LocaleSelectorComponent,
  ],
})
export class DemoSidebar implements OnDestroy {
  opened = signal(true);
  toggleSidebar() {
    this.opened.update((v) => !v);
  }

  protected isMobile = signal(false);
  menuItems = signal<MenuItem[]>([
    { route: routePaths.employeesList, label: 'Employees', icon: 'dashboard' },
    { route: routePaths.addEmployee, label: 'Add Employee', icon: 'person' },
    { route: routePaths.chat, label: 'Chat', icon: 'chat' },
    { route: routePaths.academy, label: 'Academy', icon: 'school' },
    { route: routePaths.meetings, label: 'Meetings', icon: 'calendar_today' },
    { route: routePaths.messages, label: 'Messages', icon: 'message' },
    { route: routePaths.owners, label: 'Owners', icon: 'people' },
    { route: routePaths.todo, label: 'Todo', icon: 'people' },
  ]);

  mobileQuery: MediaQueryList | undefined;
  mobileQueryListener: (() => void) | undefined;

  constructor() {
    const media = inject(MediaMatcher);

    afterNextRender(() => {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.isMobile.set(this.mobileQuery.matches);
      this.mobileQueryListener = () => {
        if (!this.mobileQuery) return;
        this.isMobile.set(this.mobileQuery.matches);
      };
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    });
  }

  ngOnDestroy(): void {
    if (!this.mobileQuery || !this.mobileQueryListener) return;
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
