/**
 * @file
 *
 * Tests that a child started by `exec` sees `process.env` as it is when the child SPAWNS, not as it was when
 * `exec.ts` was imported.
 *
 * The callers that depend on it set a variable and then start a child: `build-pages.ts` sets `CURRENT_CHANNEL`
 * right before `npm run setup`, which is the only way `docs/scripts/setup.ts` learns which channel it is
 * building. When the three helper copies converged on a module-level snapshot of `process.env`, every
 * such variable stopped reaching its child. `setup.ts` fell back to `public`, so the catalyst job failed and
 * the docs stopped deploying, while every gate stayed green. The copies are byte-identical under
 * `npm run check:exec-helpers`, so pinning this copy pins all three.
 *
 * The children are real `node` processes rather than a mocked `spawn`: the defect was in what the child
 * process received, which a mock would never see.
 */

import process from 'node:process';
// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  afterEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';

import { exec } from './exec.ts';

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
