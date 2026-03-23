import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const hero = context.locals.starlightRoute.entry.data.hero;
  if (hero?.actions) {
    for (const action of hero.actions) {
      if (action.link.startsWith('/') && !action.link.startsWith(base)) {
        action.link = base + action.link;
      }
    }
  }
});
