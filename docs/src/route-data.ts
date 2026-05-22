import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const id = context.locals.starlightRoute.id;
  // OG images are only generated for non-API pages (API has too many pages for canvaskit-wasm)
  if (id.includes('api/')) {
    return;
  }

  const slug = id.replace(/\/index$/, '').replace(/\.\w+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const ogImageUrl = new URL(`${base}/og/${slug || 'index'}.png`, context.site);
  context.locals.starlightRoute.head.push(
    { attrs: { content: ogImageUrl.href, property: 'og:image' }, tag: 'meta' },
    { attrs: { content: ogImageUrl.href, name: 'twitter:image' }, tag: 'meta' }
  );
});
