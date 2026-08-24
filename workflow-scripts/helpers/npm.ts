/**
 * @file
 *
 * The npm side of a release: what each branch is called on the registry, whether that name exists yet, and
 * the repository coordinates every manifest generated for it has to carry.
 *
 * The name derivation lives here rather than in `publish-release.ts` because two scripts now have to agree
 * on it exactly. `bootstrap-new-package.ts` claims the name by hand so a trusted publisher can be attached
 * to it, and `publish-release.ts` publishes into that name from CI. If the two ever computed the name
 * differently, the bootstrap would claim one package and CI would fail publishing to another.
 */

import type { BranchSpec } from './branchSpec.ts';

export const NPM_SCOPE = '@obsidian-typings';

/*
 * npm validates a published manifest against the provenance statement that trusted publishing attaches,
 * rejecting the publish when the two disagree. The manifests that `publish-release.ts` and
 * `bootstrap-new-package.ts` generate from scratch therefore have to carry the same repository as the
 * package.json a release branch publishes.
 */
export const REPOSITORY = {
  type: 'git',
  url: 'git+https://github.com/obsidian-typings/obsidian-typings.git'
};

/**
 * Determines whether a package name has ever been published.
 *
 * Asked against the registry directly rather than through `npm view`, which reports "missing" and "the
 * request failed" with the same non-zero exit code -- a distinction that matters here, because treating a
 * transient network failure as "does not exist" would send a release down the bootstrap path and stall it
 * for no reason.
 */
export async function doesPackageExist(packageName: string): Promise<boolean> {
  const url = `https://registry.npmjs.org/${packageName.replace('/', '%2f')}`;
  const response = await fetch(url);

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error(`npm registry returned ${String(response.status)} ${response.statusText} for ${packageName}`);
  }

  return true;
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
 * Resolves the registry name of the per-Obsidian-version package a release branch publishes to, e.g.
 * `@obsidian-typings/obsidian-public-1.13.7`.
 */
export function getScopedPackageName(branchSpec: BranchSpec): string {
  return `${NPM_SCOPE}/obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}`;
}
