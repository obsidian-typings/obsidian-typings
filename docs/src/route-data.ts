import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/**
 * Slug prefix of the generated API reference. Its ~10,700 pages share one social preview image
 * instead of getting one each: per-page images came to 244 MB per channel of incompressible PNG,
 * roughly half of the GitHub Pages artifact, for pages whose preview is a title nobody shares.
 * Hand-written pages keep their own image.
 */
const API_SLUG_PREFIX = 'api/';

export const onRequest = defineRouteMiddleware((context) => {
  const id = context.locals.starlightRoute.id;
  const slug = id
    .replace(/\/index$/, '')
    .replace(/\.\w+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = context.url.origin;
  const imageSlug = slug.startsWith(API_SLUG_PREFIX) ? 'default' : slug || 'index';
  const ogImageUrl = `${origin}${base}/og/${imageSlug}.png`;

  context.locals.starlightRoute.head.push(
    { attrs: { content: ogImageUrl, property: 'og:image' }, tag: 'meta' },
    { attrs: { content: '1200', property: 'og:image:width' }, tag: 'meta' },
    { attrs: { content: '630', property: 'og:image:height' }, tag: 'meta' },
    { attrs: { content: ogImageUrl, name: 'twitter:image' }, tag: 'meta' }
  );
});
