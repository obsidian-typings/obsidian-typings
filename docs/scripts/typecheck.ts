/**
 * @file
 *
 * Type-checks this package.
 *
 * `astro check` rather than `tsc --noEmit`, and the difference is not cosmetic. It loads the Astro language
 * plugin, so a `.astro` import resolves and a `.astro` component's frontmatter is checked; it runs
 * `astro sync` first, so the generated `.astro/types.d.ts` is never missing; and it reports nothing from
 * Starlight's own `.ts` sources, which `skipLibCheck` cannot suppress because they are sources rather than
 * declarations. A standalone `tsc --noEmit` here is 13 errors, 12 of which are artifacts of those three
 * differences.
 *
 * The `.astro` half is only reached because `tsconfig.json` names an `.astro` glob in `include` - `astro
 * check` inherits that list and checks nothing outside it.
 */

import { execFromRoot } from './helpers/root.ts';

const ARGS_START = 2;
await execFromRoot(['astro', 'check', ...process.argv.slice(ARGS_START)]);
