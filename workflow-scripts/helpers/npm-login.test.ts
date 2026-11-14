/**
 * @file
 *
 * Tests the login offer `bootstrap-new-package` makes when this machine has no npm login: it runs `npm login`
 * only when the operator agrees, judges the result by a second `npm whoami` rather than the login's exit code,
 * and with no terminal throws exactly as the script did before the offer existed.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import type { EnsureNpmLoginDependencies } from './npm-login.ts';

import { ensureNpmLogin } from './npm-login.ts';

const REASON = 'claiming the name needs one';

interface FakeOptions {
  readonly answer: null | string;
  readonly loginExitCode?: null | number;
  readonly usernames: readonly (null | string)[];
}

interface FakeResult {
  readonly calls: string[];
  readonly dependencies: EnsureNpmLoginDependencies;
}

function createFake(options: FakeOptions): FakeResult {
  const calls: string[] = [];
  const usernames = [...options.usernames];

  return {
    calls,
    dependencies: {
      askLine: (): Promise<null | string> => {
        calls.push('askLine');
        return Promise.resolve(options.answer);
      },
      getNpmUsername: (): Promise<null | string> => {
        calls.push('getNpmUsername');
        return Promise.resolve(usernames.shift() ?? null);
      },
      runNpmLogin: (): Promise<null | number> => {
        calls.push('runNpmLogin');
        return Promise.resolve(options.loginExitCode ?? 0);
      }
    }
  };
}

describe('ensureNpmLogin', () => {
  it('returns the logged-in account without asking anything', async () => {
    const { calls, dependencies } = createFake({ answer: null, usernames: ['mnaoumov'] });
    await expect(ensureNpmLogin(REASON, dependencies)).resolves.toBe('mnaoumov');
    expect(calls).toEqual(['getNpmUsername']);
  });

  it('runs npm login when the operator accepts, and returns the account it logged in as', async () => {
    const { calls, dependencies } = createFake({ answer: '', usernames: [null, 'mnaoumov'] });
    await expect(ensureNpmLogin(REASON, dependencies)).resolves.toBe('mnaoumov');
    expect(calls).toEqual(['getNpmUsername', 'askLine', 'runNpmLogin', 'getNpmUsername']);
  });

  it('throws the old instruction without logging in when there is no terminal', async () => {
    const { calls, dependencies } = createFake({ answer: null, usernames: [null] });
    await expect(ensureNpmLogin(REASON, dependencies)).rejects.toThrow(/Run `npm login` in this terminal and re-run/);
    expect(calls).toEqual(['getNpmUsername', 'askLine']);
  });

  it('throws without logging in when the operator declines', async () => {
    const { calls, dependencies } = createFake({ answer: 'n', usernames: [null] });
    await expect(ensureNpmLogin(REASON, dependencies)).rejects.toThrow(/Run `npm login` in this terminal and re-run/);
    expect(calls).toEqual(['getNpmUsername', 'askLine']);
  });

  it('throws naming the exit code when npm login fails', async () => {
    const { calls, dependencies } = createFake({ answer: 'y', loginExitCode: 1, usernames: [null] });
    await expect(ensureNpmLogin(REASON, dependencies)).rejects.toThrow(/failed with exit code 1/);
    expect(calls).toEqual(['getNpmUsername', 'askLine', 'runNpmLogin']);
  });

  it('throws when npm login exits 0 but the registry still refuses the credential', async () => {
    const { dependencies } = createFake({ answer: 'yes', usernames: [null, null] });
    await expect(ensureNpmLogin(REASON, dependencies)).rejects.toThrow(/still does not accept/);
  });
});
