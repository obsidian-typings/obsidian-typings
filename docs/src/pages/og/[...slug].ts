import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

// Get all entries from the `docs` content collection.
const entries = await getCollection('docs');

// Map the entry array to an object with the page ID as key and the
// Frontmatter data as value.
const pages = Object.fromEntries(
  entries.map(({ data, id }) => [id, { data }] as const)
);

export const { GET, getStaticPaths } = await OGImageRoute({
  // Define a function called for each page to customize the generated image.
  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      // Customize various colors and add a border.
      bgGradient: [[17, 18, 19] as const],
      border: { color: [103, 172, 172], side: 'block-end', width: 10 },
      description: page.data.description || '',
      font: {
        description: {
          color: [136, 140, 150],
          families: ['IBM Plex Sans'],
          lineHeight: 1.4
        },
        title: {
          color: [255, 255, 255],
          families: ['IBM Plex Sans'],
          size: 90,
          weight: 'Bold'
        }
      },
      fonts: [
        'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-400-normal.woff2',
        'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-700-normal.woff2'
      ],
      logo: {
        path: './assets/icon.png',
        size: [300]
      },
      padding: 90,
      // Use the page title and description as the image title and description.
      title: page.data.title
    };
  },
  // Pass down the documentation pages.
  pages,
  // Define the name of the parameter used in the endpoint path, here `slug`
  // As the file is named `[...slug].ts`.
  param: 'slug'
});
