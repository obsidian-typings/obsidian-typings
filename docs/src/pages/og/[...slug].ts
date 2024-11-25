import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

// Get all entries from the `docs` content collection.
const entries = await getCollection('docs');

// Map the entry array to an object with the page ID as key and the
// frontmatter data as value.
const pages = Object.fromEntries(
    entries
        .map(({ data, id }) => [id, { data }])
        .filter(([id]) => !id.includes('api/'))
);

export const { getStaticPaths, GET } = OGImageRoute({
    // Pass down the documentation pages.
    pages,
    // Define the name of the parameter used in the endpoint path, here `slug`
    // as the file is named `[...slug].ts`.
    param: 'slug',
    // Define a function called for each page to customize the generated image.
    getImageOptions: (_path, page: (typeof pages)[number]) => {
        return {
            // Use the page title and description as the image title and description.
            title: page.data.title,
            description: page.data.description || '',
            // Customize various colors and add a border.
            bgGradient: [[17, 18, 19] as const /*, [24, 21, 13] as const*/],
            border: { color: [103, 172, 172], width: 10, side: 'block-end' },
            font: {
                title: {
                    size: 90,
                    color: [255, 255, 255],
                    families: ['IBM Plex Sans'],
                    weight: 'Bold'
                },
                description: {
                    color: [136, 140, 150],
                    families: ['IBM Plex Sans'],
                    lineHeight: 1.4
                }
            },
            fonts: [
                'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-400-normal.woff2',
                'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-700-normal.woff2'
            ],
            padding: 90,
            logo: {
                path: './assets/icon.png',
                size: [300]
            }
        };
    }
});
