import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import {
  execFromRoot,
  toPosixPath
} from './helpers/exec.ts';

const DOCS_DIR = dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))));

async function main(): Promise<void> {
  await execFromRoot(['jiti', './scripts/generate-api-docs.ts'], { cwd: DOCS_DIR });
}

await main();
