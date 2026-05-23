import { rm } from 'node:fs/promises';
import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import { toPosixPath } from './helpers/exec.ts';

const DOCS_DIR = dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))));

await rm(`${DOCS_DIR}/.astro`, { force: true, recursive: true });
await rm(`${DOCS_DIR}/dist`, { force: true, recursive: true });
await rm(`${DOCS_DIR}/src/content/docs/api`, { force: true, recursive: true });
await rm(`${DOCS_DIR}/public/og`, { force: true, recursive: true });
console.warn('Cleaned .astro, dist, generated API docs, and OG images.');
