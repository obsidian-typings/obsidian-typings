/**
 * @file
 *
 * The npm side of a release: what each branch is called on the registry, how far along that name is, whether
 * CI is actually allowed to publish it, and the repository coordinates every manifest generated for it has to
 * carry.
 *
 * The name derivation lives here rather than in `publish-release.ts` because two scripts now have to agree
 * on it exactly. `bootstrap-new-package.ts` claims the name by hand so a trusted publisher can be attached
 * to it, and `publish-release.ts` publishes into that name from CI. If the two ever computed the name
 * differently, the bootstrap would claim one package and CI would fail publishing to another.
 *
 * The trusted-publisher half lives here for the same reason, one step later: claiming the name and attaching
 * the publisher are separate steps with separate failure modes, and the wording of "you still have to attach
 * it" is now needed by three scripts rather than one.
 */

import process from 'node:process';

import type { BranchSpec } from './branchSpec.ts';

import { execFromRoot } from './exec.ts';

/**
 * How far along a package name is on the registry.
 *
 * `placeholderOnly` is the state `bootstrap-new-package.ts` leaves a name in: claimed, so it exists, but
 * nothing has ever published through CI to it. It is deliberately distinct from `released` — see
 * {@link getPackageRegistryState}.
 */
export type PackageRegistryState = 'missing' | 'placeholderOnly' | 'released';

/** The unscoped package the `public` channel's `-latest` wrapper is itself wrapped by. */
export const LEGACY_PACKAGE_NAME = 'obsidian-typings';

export const NPM_SCOPE = '@obsidian-typings';

/** The version `bootstrap-new-package.ts` publishes to claim a name. Real releases start at `1.1.0`. */
export const PLACEHOLDER_VERSION = '0.0.0';

/*
 * A published manifest is validated by npm against the provenance statement that trusted publishing
 * attaches, and the publish is rejected when the two disagree. The manifests that `publish-release.ts` and
 * `bootstrap-new-package.ts` generate from scratch therefore have to carry the same repository as the
 * package.json a release branch publishes.
 */
export const REPOSITORY = {
  type: 'git',
  url: 'git+https://github.com/obsidian-typings/obsidian-typings.git'
};

/* The GitHub coordinates a trusted publisher is pinned to. All packages here publish from the same workflow. */
const GITHUB_OWNER = 'obsidian-typings';
const GITHUB_REPOSITORY = 'obsidian-typings';
const PUBLISH_WORKFLOW_FILE_NAME = 'publish-release.yml';

const REGISTRY_URL = 'https://registry.npmjs.org';

/* The HTTP status range npm answers a token exchange with when the answer is about THIS request, not the server. */
const CLIENT_ERROR_MIN_STATUS = 400;
const CLIENT_ERROR_MAX_STATUS = 499;

const NOT_FOUND_STATUS = 404;

interface ActionsIdTokenResponse {
  value?: string;
}

interface Packument {
  versions?: Record<string, unknown>;
}

interface TokenExchangeResponse {
  token?: string;
}

/**
 * Resolves the registry name of the stable `-latest` wrapper for a channel, e.g.
 * `@obsidian-typings/obsidian-public-latest`. Unlike the per-version packages, these names never change, so
 * their trusted publishers are configured once and never again.
 */
export function getLatestWrapperPackageName(channel: BranchSpec['channel']): string {
  return `${NPM_SCOPE}/obsidian-${channel}-latest`;
}

/**
 * Resolves the npm account this machine's credential belongs to, or `null` when the registry will not accept it.
 *
 * `npm whoami` is the one npm command that asks the registry who you are without changing anything, and its
 * failure covers both halves of what goes wrong here (measured 2026-09-14, npm 12.0.2): no token configured at
 * all exits 1 with `ENEEDAUTH`, and a token the registry no longer accepts exits 1 with `E401`. Both are fixed
 * by the same `npm login`, so a caller has no reason to tell them apart.
 *
 * The exit code is the signal, not stdout: npm writes its diagnostics to stderr and leaves stdout empty on
 * either failure. That is what `shouldIncludeDetails` is for -- it is the only way to read one -- and
 * `isQuiet` keeps a raw `ENEEDAUTH` from printing next to the sentence a caller wrote to explain it.
 *
 * This was a bare `spawnSync` until 2026-09-15, because `execFromRoot`'s detail mode was unreachable: see the
 * discriminator note in `exec.ts`. It is that mode's only caller, which makes it the guard on the fix as well
 * as its beneficiary: nothing else in this package reads an exit code, so reverting the discriminator turns
 * `result.exitCode` here into a property on `string` and `npm run typecheck` goes red. Without a caller the
 * bug is invisible to every gate, which is how it survived unnoticed in the first place.
 */
export async function getNpmUsername(): Promise<null | string> {
  const result = await execFromRoot('npm whoami', {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });

  if (result.exitCode !== 0) {
    return null;
  }

  return result.stdout.trim() || null;
}

/**
 * Determines how far along a package name is: never published, claimed by the bootstrap placeholder and
 * nothing else, or carrying at least one real release.
 *
 * Asked against the registry directly rather than through `npm view`, which reports "missing" and "the
 * request failed" with the same non-zero exit code -- a distinction that matters here, because treating a
 * transient network failure as "does not exist" would send a release down the bootstrap path and stall it
 * for no reason.
 *
 * The three states exist because "the package exists" is NOT the predicate for "the bootstrap is done", and
 * two scripts used to treat it as one. The hand-back is two steps -- claim the name, then attach its trusted
 * publisher on npmjs.com -- with separate failure modes, and after the placeholder publishes, mere existence
 * is `true` in both states. It cannot be narrowed further from here, because npm exposes no way to read a
 * package's trusted publisher: `npm access` has no subcommand for it (checked in npm 12.0.2), and the
 * registry offers no unauthenticated endpoint. What CAN be read is the consequence: a package carrying a real
 * release has, by definition, already published through CI, so its publisher is attached. One carrying only
 * the placeholder has not, and its publisher state is simply unknown -- which is the honest answer, and the
 * one that stops a caller dispatching a release into it. {@link hasTrustedPublisher} answers the question
 * directly, but only from inside the CI job.
 */
export async function getPackageRegistryState(packageName: string): Promise<PackageRegistryState> {
  const url = `${REGISTRY_URL}/${escapePackageName(packageName)}`;
  const response = await fetch(url);

  if (response.status === NOT_FOUND_STATUS) {
    return 'missing';
  }

  if (!response.ok) {
    throw new Error(`npm registry returned ${String(response.status)} ${response.statusText} for ${packageName}`);
  }

  const packument = await response.json() as Packument;
  const versions = Object.keys(packument.versions ?? {});

  if (versions.length === 0 || versions.every((version) => version === PLACEHOLDER_VERSION)) {
    return 'placeholderOnly';
  }

  return 'released';
}

/**
 * Resolves the registry name of the per-Obsidian-version package a release branch publishes to, e.g.
 * `@obsidian-typings/obsidian-public-1.13.7`.
 */
export function getScopedPackageName(branchSpec: BranchSpec): string {
  return `${NPM_SCOPE}/obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}`;
}

/**
 * The remedy for a package with no trusted publisher attached, worded once.
 *
 * Printed by `bootstrap-new-package.ts` after it claims a name, printed by `create-new-release-branch.ts`
 * when it refuses to dispatch into a name nothing has published through, and embedded in the error
 * `publish-release.ts` throws when CI meets the consequence. Every field is case-sensitive on npmjs.com, so
 * the list is given verbatim rather than described.
 */
export function getTrustedPublisherInstructions(packageName: string): string {
  return [
    '',
    'Attach the trusted publisher, or CI still will not be able to publish it:',
    '',
    `  1. Open https://www.npmjs.com/package/${packageName}/access`,
    '  2. Under "Trusted Publisher", choose GitHub Actions and enter, exactly (every field is case-sensitive):',
    '',
    `       Organization or user: ${GITHUB_OWNER}`,
    `       Repository:           ${GITHUB_REPOSITORY}`,
    `       Workflow filename:    ${PUBLISH_WORKFLOW_FILE_NAME}`,
    '       Environment name:     (leave empty)',
    '       Allowed actions:      npm publish',
    '',
    '  3. Save, then release the branch as usual with `npm run release`.',
    ''
  ].join('\n');
}

/**
 * Determines whether this CI job is allowed to publish the package, or `null` when that cannot be told from
 * here.
 *
 * This is the check `npm publish` makes and then throws away. Reading npm 12.0.2's `lib/utils/oidc.js`: it
 * requests a GitHub Actions ID token with audience `npm:<registry host>`, POSTs it to
 * `/-/npm/v1/oidc/token/exchange/package/<name>`, and on ANY failure logs at `verbose` and returns silently,
 * because OIDC is an optional feature the registry may not offer at all. `npm publish` then carries on with
 * no credential, and npm answers an unauthorized `PUT` with **404**, not 401 -- it will not confirm the
 * existence of something you may not read. So a package whose trusted publisher was never attached fails
 * with `E404 ... could not be found or you do not have permission` against a name that plainly does exist,
 * and the run's only clue is a log line nobody enabled. (Measured 2026-09-14: two dispatches died exactly
 * that way, having already burned a version number each.) Asking the same question up front is the whole of
 * the fix.
 *
 * Only a **4xx** is treated as a definitive "no". Everything else -- not running in Actions, no
 * `id-token: write` permission, a 5xx, a network failure, a 2xx that somehow carries no token -- answers
 * `null`, meaning "could not tell", and leaves the caller to publish and find out. The asymmetry is
 * deliberate: a wrong "no" costs a re-run of a job that has not yet changed anything, while a wrong "yes"
 * costs a version number, because the publish it lets through happens after the release commit and tag are
 * already pushed.
 */
export async function hasTrustedPublisher(packageName: string): Promise<boolean | null> {
  const idToken = await fetchActionsIdToken();

  if (idToken === null) {
    return null;
  }

  let response: Response;

  try {
    response = await fetch(`${REGISTRY_URL}/-/npm/v1/oidc/token/exchange/package/${escapePackageName(packageName)}`, {
      headers: {
        authorization: `Bearer ${idToken}`
      },
      method: 'POST'
    });
  } catch {
    return null;
  }

  if (response.ok) {
    const body = await response.json() as TokenExchangeResponse;
    return body.token ? true : null;
  }

  if (response.status >= CLIENT_ERROR_MIN_STATUS && response.status <= CLIENT_ERROR_MAX_STATUS) {
    return false;
  }

  return null;
}

/**
 * The single-path-segment form of a package name that both the packument URL and the token exchange take.
 * Only the scope separator is escaped; npm's own `npm-package-arg` does exactly this and no more.
 */
function escapePackageName(packageName: string): string {
  return packageName.replace('/', '%2f');
}

/**
 * Requests this job's GitHub Actions OIDC token for the npm registry, or `null` when there is none to be had.
 *
 * The two `ACTIONS_ID_TOKEN_REQUEST_*` variables exist only inside a GitHub Actions job that declared
 * `permissions: id-token: write`, so their absence is the test for "not running under CI that can do this" --
 * the same test npm makes, and cheaper than detecting the CI vendor.
 */
async function fetchActionsIdToken(): Promise<null | string> {
  const requestUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
  const requestToken = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];

  if (!requestUrl || !requestToken) {
    return null;
  }

  const url = new URL(requestUrl);
  url.searchParams.set('audience', `npm:${new URL(REGISTRY_URL).hostname}`);

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${requestToken}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const body = await response.json() as ActionsIdTokenResponse;
    return body.value ?? null;
  } catch {
    return null;
  }
}
