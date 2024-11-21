export const LOCALES = ['en'];

export const APP_DEBUG = process.env.APP_DEBUG === '1';
export const APP_ENV = process.env.APP_ENV || 'stage';

export const STATIC_ROUTES = {
  Blog: '/blog',
  Projects: '/projects',
  Tags: '/tags',
} as const;
