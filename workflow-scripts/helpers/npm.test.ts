/**
 * @file
 *
 * Tests the one decision the trusted-publisher hand-back makes that nothing else can check: what a package's
 * state IS once an attach has run, given what was known about it before.
 *
 * Both halves are load-bearing and neither is visible from a type. `E409` -- the registry refusing to add a
 * publisher that overlaps one the package already has (measured 2026-09-17) -- is a failure of the POST and
 * an `attached` package, so folding it in with the refusals would report a correctly configured package as
 * broken. And a failed attach answers with the state that was known BEFORE it, which is `none` for a name
 * just claimed or just read as empty and `unknown` for one that could not be read at all: answering `none`
 * there would turn "nobody could tell" into "npm said no".
 *
 * Three call sites share that mapping, and a site that quietly disagreed with the others would be wrong in a
 * way no gate would catch.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import { getTrustedPublisherStateAfterAttach } from './npm.ts';

describe('getTrustedPublisherStateAfterAttach', () => {
  it('reports a successful attach as attached', () => {
    expect(getTrustedPublisherStateAfterAttach('attached', 'none')).toBe('attached');
    expect(getTrustedPublisherStateAfterAttach('attached', 'unknown')).toBe('attached');
  });

  it('reports the registry refusing an overlapping second configuration as attached', () => {
    expect(getTrustedPublisherStateAfterAttach('alreadyConfigured', 'none')).toBe('attached');
    expect(getTrustedPublisherStateAfterAttach('alreadyConfigured', 'unknown')).toBe('attached');
  });

  it('keeps a definite none after every attach that created nothing', () => {
    expect(getTrustedPublisherStateAfterAttach('challenged', 'none')).toBe('none');
    expect(getTrustedPublisherStateAfterAttach('oneTimePasswordRejected', 'none')).toBe('none');
    expect(getTrustedPublisherStateAfterAttach('refused', 'none')).toBe('none');
  });

  it('leaves an unreadable state unknown rather than narrowing it to none', () => {
    expect(getTrustedPublisherStateAfterAttach('challenged', 'unknown')).toBe('unknown');
    expect(getTrustedPublisherStateAfterAttach('oneTimePasswordRejected', 'unknown')).toBe('unknown');
    expect(getTrustedPublisherStateAfterAttach('refused', 'unknown')).toBe('unknown');
  });
});
