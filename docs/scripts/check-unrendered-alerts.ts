/**
 * @file
 *
 * Fails when a page of the built site still shows a GitHub alert as a plain blockquote.
 *
 * `build.ts` runs this as its last step, so the Pages build fails rather than deploying a page that opens a
 * blockquote with a literal `[!NOTE]`. That is what the site shipped while no plugin in its `unified` pipeline knew
 * the syntax, and nothing reported it: the build was green. `remark-github-alerts.ts` is the conversion; this is the
 * check that holds whichever plugin does it.
 *
 * Usage: `jiti scripts/check-unrendered-alerts.ts [<outDir>]`, where `<outDir>` defaults to `dist`.
 */

import { existsSync } from 'node:fs';
import {
  readdir,
  readFile
} from 'node:fs/promises';
import {
  join,
  relative
} from 'node:path/posix';

import type { BuiltPage } from './helpers/unrendered-alerts.ts';

import { toPosixPath } from './helpers/root.ts';
import {
  collectUnrenderedAlerts,
  formatUnrenderedAlerts
} from './helpers/unrendered-alerts.ts';

const OUTPUT_DIRECTORY_ARG_INDEX = 2;

async function main(): Promise<void> {
  const outputDirectory = toPosixPath(process.argv[OUTPUT_DIRECTORY_ARG_INDEX] ?? 'dist');
  if (!existsSync(outputDirectory)) {
    throw new Error(`The built site was not found at ${outputDirectory}.`);
  }

  const pages: BuiltPage[] = [];
  const entries = await readdir(outputDirectory, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) {
      continue;
    }

    const path = join(toPosixPath(entry.parentPath), entry.name);
    pages.push({ html: await readFile(path, 'utf-8'), relativePath: relative(outputDirectory, path) });
  }

  const unrenderedAlerts = collectUnrenderedAlerts(pages);
  if (unrenderedAlerts.length > 0) {
    console.error(`${String(unrenderedAlerts.length)} GitHub alert(s) rendered as plain blockquotes:`);
    console.error(formatUnrenderedAlerts(unrenderedAlerts));
    process.exit(1);
  }

  console.warn(`No unrendered GitHub alerts in ${String(pages.length)} page(s).`);
}

await main();
