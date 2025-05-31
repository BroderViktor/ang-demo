import { Routes } from '@angular/router';
import { routePaths } from './appRouteTypes';
import { EmptyPageComponent } from './pages/404-page/empty-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  {
    path: routePaths.signIn,
    pathMatch: 'full',
    component: SignInPageComponent,
    title: 'Sign In',
  },
  {
    path: routePaths.homePage,
    pathMatch: 'full',
    component: HomepageComponent,
    title: 'Home Page',
  },
  {
    path: routePaths.signUp,
    pathMatch: 'full',
    component: SignUpPageComponent,
    title: 'Sign Up',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: routePaths.homePage,
  },
  {
    path: '**',
    component: EmptyPageComponent,
  },
] as const;
