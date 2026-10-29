/**
 * @file
 *
 * Cutting a new release branch, shared by the two callers that do it.
 *
 * `create-new-release-branch.ts` is the hand-run command, and it goes on to hand the npm steps back to the
 * person at the terminal. `check-obsidian-package-update.ts` cuts the same branch unattended when Obsidian
 * ships a new version, and reports instead. The cut itself is identical, so it lives here once.
 */

import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

import type { BranchSpec } from './branch-spec.ts';
import type { PackageRegistryState } from './npm.ts';

import {
  assertNewBranchFollowsLatest,
  selectLatestBranch
} from './base-branch.ts';
import { generateBranchName } from './branch-spec.ts';
import {
  CHANGELOG_FILE_NAME,
  createInitialChangelog,
  writeChangelog
} from './changelog.ts';
import { restoreWorkflowScripts } from './checkout.ts';
import { commit } from './git.ts';
import {
  editPackageJson,
  editPackageLockJson
} from './json.ts';
import {
  getPackageRegistryState,
  getScopedPackageName
} from './npm.ts';
import { generateReadme } from './readme-generator.ts';
import { getLatestVersion } from './version.ts';

const INITIAL_BRANCH_VERSION = '1.0.0';

/**
 * Cuts, resets and pushes a new release branch, and says what npm knows about its package.
 *
 * The checkout is left on the new branch, with `workflow-scripts` restored.
 *
 * @param newBranchSpec - The branch to cut.
 * @param changelogUrl - The Obsidian changelog page its README links.
 * @returns The registry state of the branch's npm package.
 */
export async function cutReleaseBranch(newBranchSpec: BranchSpec, changelogUrl: string): Promise<PackageRegistryState> {
  const latestPublicVersion = await getLatestVersion('public');
  const latestCatalystVersion = await getLatestVersion('catalyst');

  // Both decisions live in `base-branch.ts`, where they are pure and tested.
  const latestBranchSpec = selectLatestBranch(latestCatalystVersion, latestPublicVersion);
  assertNewBranchFollowsLatest(newBranchSpec, latestBranchSpec);

  const latestBranch = generateBranchName(latestBranchSpec);
  const newBranch = generateBranchName(newBranchSpec);

  // The base branch NAME is chosen from the REMOTE refs -- `getLatestVersion()` fetches and reads
  // `origin/release/obsidian-<channel>/*` -- so the base CONTENT has to come from the remote ref too.
  // A bare `git checkout "${latestBranch}"` cuts from whatever the LOCAL ref happens to be, which
  // silently bases a release branch on stale content when the local checkout is behind, and smuggles
  // local unpushed commits into it when the local checkout is ahead. Branching straight off
  // `origin/${latestBranch}` also leaves the local branch alone, so local work is neither destroyed
  // nor shipped. `--no-track` keeps the new branch from inheriting the base's upstream; the
  // `git push -u` below sets its own. `getLatestVersion()` has already fetched, so `origin/...` is current.
  await execFromRoot(`git checkout -b "${newBranch}" --no-track "origin/${latestBranch}"`);

  // Release branches `.gitignore` `/workflow-scripts`, so these arrive as ignored untracked files that
  // survive every later branch switch and are never committed. They have to be in place before
  // `generateReadme()` (it reads `./workflow-scripts/README.template.md`) and before `npm run release`.
  await restoreWorkflowScripts();
  await resetBranchState();
  await execFromRoot(`git push -u origin "${newBranch}"`);
  await generateReadme(newBranchSpec, changelogUrl);

  // A new Obsidian version means a package name npm has never seen, and CI cannot create one: it publishes
  // through trusted publishing, which is configured per package and so requires the package to already
  // exist. Each caller decides what to do about that; this only asks.
  //
  // "Exists" is NOT the predicate for "the hand-back is done". The hand-back is two steps -- claim the name,
  // then attach its trusted publisher -- and this unauthenticated check sees only the first of them: has
  // anything ever published through this name? A package carrying a real release has already published from
  // this very workflow, so its publisher is attached; one carrying only the bootstrap placeholder has not,
  // and this check cannot tell why. `npm trust list` can, but only from a logged-in machine with a one-time
  // password; see `readTrustedPublisherState`.
  return await getPackageRegistryState(getScopedPackageName(newBranchSpec));
}

/**
 * Puts the freshly cut branch into the state a brand-new package starts from.
 *
 * TWO things reset, and the second is as load-bearing as the first. A new branch mints a package name npm has
 * never seen -- `getScopedPackageName` builds it from the Obsidian version -- so its version restarts at
 * {@link INITIAL_BRANCH_VERSION}, and its changelog has to restart with it. Inheriting the base branch's
 * changelog would publish another package's history under a numbering that has just gone back to `1.0.0`.
 *
 * That was invisible until 2026-09-23, because the file was a three-line stub every branch inherited from
 * every other and nothing ever wrote it. `publish-release.ts` now writes a real one per release, which is
 * what makes the reset necessary rather than merely tidy.
 */
async function resetBranchState(): Promise<void> {
  await resetPackageVersion();
  await writeChangelog(createInitialChangelog());

  await execFromRoot(`git add package.json package-lock.json ${CHANGELOG_FILE_NAME}`);

  const stagedFileNames = await execFromRoot('git diff --staged --name-only', { isQuiet: true });
  const hasChanges = stagedFileNames.trim() !== '';
  if (!hasChanges) {
    console.log(`Version is already ${INITIAL_BRANCH_VERSION} and the changelog is already empty, skipping the reset commit.`);
    return;
  }

  await commit(`chore(release): reset to ${INITIAL_BRANCH_VERSION}`);
}

async function resetPackageVersion(): Promise<void> {
  await editPackageJson((packageJson) => {
    packageJson.version = INITIAL_BRANCH_VERSION;
  });

  await editPackageLockJson((packageLockJson) => {
    packageLockJson.version = INITIAL_BRANCH_VERSION;

    const defaultPackage = packageLockJson.packages?.[''];
    if (defaultPackage) {
      defaultPackage.version = INITIAL_BRANCH_VERSION;
    }
  });
}
