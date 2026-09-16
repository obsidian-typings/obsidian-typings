/**
 * @file
 *
 * Generates Astro's type cache, as npm's `prepare` hook - so an install of this package leaves the tree in a
 * state the repo's own gates pass on, rather than one a contributor has to know how to repair.
 *
 * `src/env.d.ts` imports `.astro/types.d.ts`, Astro generates that file, and the root `.gitignore` hides the
 * whole directory. Until it exists the ROOT `npm run lint` - which reaches `docs/` because that tree has no
 * `eslint.config.mts` of its own - fails with 12 errors in a package the contributor never touched: one
 * `import-x/no-unresolved` on that import, then 11 `no-unsafe-*` and `restrict-plus-operands` in
 * `src/route-middleware.ts`, which loses its types and degrades to `any`. It stayed invisible for as long as
 * it did because every machine that has ever built or served the docs already has the file.
 *
 * `astro sync` is `astro build`'s own first step run alone, and costs ~20 s. The full build is not an
 * alternative here: it needs ~21 GB and OOM-kills a standard runner, which is why `build-pages.yml` carries a
 * swapfile. `npm run clean` deletes the directory again, and the next install - or `npm run prepare` by hand -
 * puts it back.
 */

import { execFromRoot } from './helpers/root.ts';

await execFromRoot(['astro', 'sync']);
