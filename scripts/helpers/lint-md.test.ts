import {
  mkdir,
  mkdtemp,
  rm,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import { verifyLinks } from './lint-md.ts';

const LINKINATOR_TIMEOUT_IN_MILLISECONDS = 60_000;

describe('verifyLinks', () => {
  let serverRoot = '';

  beforeEach(async () => {
    serverRoot = await mkdtemp(join(tmpdir(), 'lint-md-'));
    await mkdir(join(serverRoot, 'reports'));
    await mkdir(join(serverRoot, 'tests'));
    await writeFile(join(serverRoot, 'tests', 'target.ts'), 'export {};\n');
  });

  afterEach(async () => {
    await rm(serverRoot, { force: true, recursive: true });
  });

  it('resolves a parent-folder link from a single file against the server root', async () => {
    await writeFile(join(serverRoot, 'reports', 'report.md'), '# Report\n\n[target](../tests/target.ts)\n');
    await expect(verifyLinks({ files: ['reports/report.md'], serverRoot })).resolves.toBeUndefined();
  }, LINKINATOR_TIMEOUT_IN_MILLISECONDS);

  it('still reports a parent-folder link whose target is missing', async () => {
    await writeFile(join(serverRoot, 'reports', 'report.md'), '# Report\n\n[missing](../tests/missing.ts)\n');
    await expect(verifyLinks({ files: ['reports/report.md'], serverRoot })).rejects.toThrow(/missing\.ts/);
  }, LINKINATOR_TIMEOUT_IN_MILLISECONDS);
});
