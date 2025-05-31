export const routePaths = {
  homePage: 'home',
  signIn: 'login',
  signUp: 'sign-up',
} as const;

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];
