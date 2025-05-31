export const routePaths = {
  homePage: 'home',
  signIn: 'sign-in',
} as const;

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];
