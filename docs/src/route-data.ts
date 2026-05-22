import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const slug = context.locals.starlightRoute.id.replace(/\/index$/, '').replace(/\.\w+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const ogImageUrl = new URL(`${base}/og/${slug || 'index'}.png`, context.site);
  context.locals.starlightRoute.head.push(
    { attrs: { content: ogImageUrl.href, property: 'og:image' }, tag: 'meta' },
    { attrs: { content: ogImageUrl.href, name: 'twitter:image' }, tag: 'meta' }
  );
});
