import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import {
  execFromRoot,
  toPosixPath
} from './helpers/exec.ts';

const DOCS_DIR = dirname(dirname(toPosixPath(fileURLToPath(import.meta.url))));

async function main(): Promise<void> {
  await execFromRoot(['npm', 'run', 'build:generate-index'], { cwd: dirname(DOCS_DIR) });
  await execFromRoot(['jiti', './scripts/preprocess.ts'], { cwd: DOCS_DIR });
}

await main();
