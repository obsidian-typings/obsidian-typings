import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const id = context.locals.starlightRoute.id;
  const slug = id
    .replace(/\/index$/, '')
    .replace(/\.\w+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = context.url.origin;
  const ogImageUrl = `${origin}${base}/og/${slug || 'index'}.png`;

  context.locals.starlightRoute.head.push(
    { attrs: { content: ogImageUrl, property: 'og:image' }, tag: 'meta' },
    { attrs: { content: '1200', property: 'og:image:width' }, tag: 'meta' },
    { attrs: { content: '630', property: 'og:image:height' }, tag: 'meta' },
    { attrs: { content: ogImageUrl, name: 'twitter:image' }, tag: 'meta' }
  );
});
