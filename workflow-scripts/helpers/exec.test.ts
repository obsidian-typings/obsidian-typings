/**
 * @file
 *
 * Tests that a child started by `@mnaoumov/typescript-dev-toolkit`'s `exec` sees `process.env` as it is when the
 * child SPAWNS, not as it was when the module was imported.
 *
 * The callers that depend on it set a variable and then start a child: `build-pages.ts` sets `CURRENT_CHANNEL`
 * right before `npm run setup`, which is the only way `docs/scripts/setup.ts` learns which channel it is
 * building. When this repo's own copies of `exec` converged on a module-level snapshot of `process.env`,
 * every such variable stopped reaching its child. `setup.ts` fell back to `public`, so the catalyst job failed
 * and the docs stopped deploying, while every gate stayed green. Those copies are gone and every tree imports the
 * toolkit's `exec` now, so this pins the dependency's behavior for the release scripts that rely on it.
 *
 * The children are real `node` processes rather than a mocked `spawn`: the defect was in what the child
 * process received, which a mock would never see.
 */

import { exec } from '@mnaoumov/typescript-dev-toolkit/exec';
import process from 'node:process';
// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

const PROBE_VARIABLE = 'OBSIDIAN_TYPINGS_EXEC_ENV_PROBE';

// `-e` with `String()` rather than `-p`: `-p` prints through `util.inspect`, which colors `undefined` under the
// `FORCE_COLOR` vitest exports.
async function readProbeInChild(env: Readonly<Record<string, string>> = {}): Promise<string> {
  const output = await exec([process.execPath, '-e', `process.stdout.write(String(process.env.${PROBE_VARIABLE}))`], { env, isQuiet: true });
  return output.trim();
}

describe('exec child environment', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('passes a variable set after the module was imported', async () => {
    vi.stubEnv(PROBE_VARIABLE, 'catalyst');
    expect(await readProbeInChild()).toBe('catalyst');
  });

  it('passes the current value of a variable changed between two spawns', async () => {
    vi.stubEnv(PROBE_VARIABLE, 'public');
    expect(await readProbeInChild()).toBe('public');
    vi.stubEnv(PROBE_VARIABLE, 'catalyst');
    expect(await readProbeInChild()).toBe('catalyst');
  });

  it('does not pass a variable deleted before the spawn', async () => {
    vi.stubEnv(PROBE_VARIABLE, 'stale');
    vi.stubEnv(PROBE_VARIABLE, undefined);
    expect(await readProbeInChild()).toBe('undefined');
  });

  it('lets the env option override the inherited value', async () => {
    vi.stubEnv(PROBE_VARIABLE, 'public');
    expect(await readProbeInChild({ [PROBE_VARIABLE]: 'catalyst' })).toBe('catalyst');
  });
});
