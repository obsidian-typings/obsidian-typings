import { compare } from 'semver';

import type { BranchSpec } from './helpers/branchSpec.ts';

import { generateBranchName } from './helpers/branchSpec.ts';
import { restoreWorkflowScripts } from './helpers/checkout.ts';
import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import {
  editPackageJson,
  editPackageLockJson,
  execFromRoot
} from './helpers/exec.ts';
import { commit } from './helpers/git.ts';
import { offerRelease } from './helpers/handBack.ts';
import {
  getNpmUsername,
  getPackageRegistryState,
  getScopedPackageName,
  getTrustedPublisherInstructions,
  readTrustedPublisherState
} from './helpers/npm.ts';
import {
  generateMainReadme,
  generateReadme
} from './helpers/readmeGenerator.ts';
import { getLatestVersion } from './helpers/version.ts';

exitIfScriptDisabled();

const INITIAL_BRANCH_VERSION = '1.0.0';

async function main(): Promise<void> {
  const [, , newVersionArg, newVersionChannelArg, changelogUrlArg] = process.argv;

  const newVersion = newVersionArg ?? '';
  const newVersionChannel = newVersionChannelArg as 'catalyst' | 'public' | undefined;
  const changelogUrl = changelogUrlArg ?? '';
  if (!newVersion || !newVersionChannel || !['catalyst', 'public'].includes(newVersionChannel) || !changelogUrl) {
    throw new Error('Usage: jiti ./workflow-scripts/create-new-release-branch.ts <newVersion> <public|catalyst> <changelogUrl>');
  }

  const latestPublicVersion = await getLatestVersion('public');
  const latestCatalystVersion = await getLatestVersion('catalyst');

  let latestVersionChannel: 'catalyst' | 'public';
  let latestVersion: string;

  // For one and the same Obsidian version the public branch is cut AFTER the catalyst one, so on a tie
  // public is the later of the two, and it is the branch a new release has to be based on. The comparison
  // is therefore `<= 0`, not `< 0`: an equal pair used to fall into the `else` and pick catalyst, the older
  // of the two. The equal-version guard below encodes the very same ordering -- it refuses a new `catalyst`
  // at the latest version and lets a new `public` through -- so this used to contradict its own guard.
  if (compare(latestCatalystVersion, latestPublicVersion) <= 0) {
    latestVersionChannel = 'public';
    latestVersion = latestPublicVersion;
  } else {
    latestVersionChannel = 'catalyst';
    latestVersion = latestCatalystVersion;
  }

  if (compare(newVersion, latestVersion) < 0) {
    throw new Error(`New Obsidian version ${newVersion} is older than the latest version ${latestVersion} ${latestVersionChannel}.`);
  }

  if (compare(newVersion, latestVersion) === 0) {
    if (newVersionChannel === latestVersionChannel) {
      throw new Error(`New Obsidian version ${newVersion} is the same as the latest version ${latestVersion} ${latestVersionChannel}.`);
    }

    if (newVersionChannel === 'catalyst') {
      throw new Error(`New Obsidian version ${newVersion} is the same as the latest version ${latestVersion} ${latestVersionChannel}.`);
    }
  }

  const latestBranch = generateBranchName({ channel: latestVersionChannel, obsidianVersion: latestVersion });
  const newBranchSpec: BranchSpec = { channel: newVersionChannel, obsidianVersion: newVersion };
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
  await resetPackageVersion();
  await execFromRoot(`git push -u origin "${newBranch}"`);
  await generateReadme(newBranchSpec, changelogUrl);

  // A new Obsidian version means a package name npm has never seen, and CI cannot create one: it publishes
  // through trusted publishing, which is configured per package and so requires the package to already
  // exist. So the steps that need a human are handed back to the human rather than dispatched into.
  //
  // "Exists" is NOT the predicate for "the hand-back is done", which is what this used to ask. The hand-back
  // is two steps -- claim the name, then attach its trusted publisher -- and this unauthenticated check sees
  // only the first of them: has anything ever published through this name? A package carrying a real release
  // has already published from this very workflow, so its publisher is attached; one carrying only the
  // bootstrap placeholder has not, and this check cannot tell why.
  //
  // It used to be the ONLY question available, on the belief that npm exposes no way to read a package's
  // publisher. `npm trust list` is that way, and the `placeholderOnly` arm below now asks it -- but only
  // there, and only as a second question. It is authenticated and 2FA-gated, so it answers from a logged-in
  // machine and nowhere else, while this one answers anywhere; and it would be a waste on the `released` arm,
  // which is already certain. See `readTrustedPublisherState` for both measurements.
  //
  // What it does NOT mean any more is that a wrong guess is expensive. The two runs that died with a bare
  // `E404` on 2026-09-14 -- `obsidian-catalyst/1.14.0` and `1.14.1` -- each burned a minor and left a tag
  // behind because the publish was attempted after the bump, the commit, the tag and the push.
  // `publish-release.ts` now asks npm for the publish right before any of that, so the same mistake today
  // costs a red run and nothing else.
  const packageName = getScopedPackageName(newBranchSpec);
  const registryState = await getPackageRegistryState(packageName);

  if (registryState === 'released') {
    // Publish the new branch right away, so it never sits created-but-unreleased.
    await execFromRoot('npm run release');
    await generateMainReadme();
    return;
  }

  // Both remaining arms hand a step back to a human, and everything they hand back runs on the NEW branch --
  // so this is the last moment that wants to be anywhere else. `generateMainReadme()` opens with
  // `git checkout main` and never switches back, which used to leave the operator standing on `main` while
  // being told to run `npm run release`: a script `main`'s `package.json` does not define at all, so the last
  // step of the hand-back failed with `Missing script: "release"` rather than merely being forgotten.
  await generateMainReadme();
  await execFromRoot(`git checkout "${newBranch}"`);
  await restoreWorkflowScripts();

  if (registryState === 'missing') {
    // The bootstrap step is the only release step that needs a local npm credential, and this is where the
    // operator is standing when they are told to run it -- so check the credential HERE, where saying "log in
    // first" costs one `npm whoami` on a path that is already stopping, rather than letting them discover it
    // one command later as an E404 npm reports for an unauthorized PUT to a name that does not exist yet.
    printBootstrapRequired(packageName, newBranchSpec, await getNpmUsername());
    return;
  }

  // `placeholderOnly`. The name is claimed, so the only step that can still be outstanding is the publisher --
  // and that one CAN be asked about directly, from a machine that is logged in to npm. When the answer comes
  // back, it is the answer, and `offerRelease` dispatches without putting a question at all. When it does not
  // -- no login here, or a one-time-password challenge with no terminal to answer it -- the arm falls back to
  // what it has always done and asks the operator. A wrong answer there is not expensive:
  // `publish-release.ts` checks the publish right before it does anything irreversible, so a dispatch into a
  // package with no publisher attached costs a red run.
  const publisherState = await readTrustedPublisherState(packageName);

  if (publisherState !== 'attached') {
    printTrustedPublisherRequired(packageName, publisherState === 'none');
  }

  await offerRelease(newBranchSpec, packageName, publisherState);
}

function printBootstrapRequired(packageName: string, branchSpec: BranchSpec, npmUsername: null | string): void {
  console.log([
    '',
    `Branch created, but ${packageName} does not exist on npm yet, so the release was NOT dispatched.`,
    '',
    ...npmUsername === null
      ? [
        'npm does not currently accept this machine\'s credential, and claiming the name needs one. Log in first,',
        'or the step below dies with an E404 that looks like a registry-side refusal and is not one:',
        '',
        '  npm login',
        ''
      ]
      : [`Logged in to npm as ${npmUsername}.`, ''],
    'Claim the name and attach its trusted publisher first:',
    '',
    `  npm run bootstrap-new-package -- ${branchSpec.obsidianVersion} ${branchSpec.channel}`,
    '',
    'That script publishes a placeholder, prints what to enter on npmjs.com, and then waits: once you have',
    'saved the form it offers to dispatch the release itself, so this branch is not left created-but-',
    'unreleased. Decline the offer and it hands back the two commands that do it by hand.',
    '',
    `This checkout has been left on ${generateBranchName(branchSpec)}, which is where both of them run.`,
    ''
  ].join('\n'));
}

function printTrustedPublisherRequired(packageName: string, isPublisherKnownMissing: boolean): void {
  console.log([
    '',
    `Branch created, but nothing has ever published through ${packageName}, so the release was NOT dispatched.`,
    '',
    'The name is claimed -- a bootstrap placeholder holds it -- so the first half of the hand-back is done.',
    ...isPublisherKnownMissing
      ? ['npm reports no trusted publisher on it, so the second half is definitely still outstanding.']
      : [
        'Whether the second half is done could not be read from here: `npm trust list` needs an npm login and',
        'a terminal it can put a one-time-password challenge to. So the prompt below asks you instead.'
      ],
    getTrustedPublisherInstructions(packageName)
  ].join('\n'));
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

  await execFromRoot('git add package.json package-lock.json');

  const hasChanges = (await execFromRoot('git diff --staged --name-only', { isQuiet: true })).trim() !== '';
  if (!hasChanges) {
    console.log(`Version is already ${INITIAL_BRANCH_VERSION}, skipping the reset commit.`);
    return;
  }

  await commit(`chore(release): reset to ${INITIAL_BRANCH_VERSION}`);
}

await main();
