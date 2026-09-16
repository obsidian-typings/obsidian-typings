/**
 * @file
 *
 * Claims the npm name for a brand-new release branch, so that CI can publish to it afterwards.
 *
 * npm attaches a trusted publisher to a *package*, on that package's settings page, which means the package
 * has to exist before the publisher can be configured -- and a package only comes into existence by being
 * published. CI has no npm credential at all under trusted publishing, so it cannot break that cycle;
 * npm has no equivalent of PyPI's pre-registered publisher (npm/cli#8544).
 *
 * A human can break it, because a human has interactive 2FA. This script is that step: run locally, once,
 * whenever a new Obsidian version mints a new package name. It publishes a placeholder version so the name
 * exists and the publisher can be attached, and prints exactly what to enter on npmjs.com.
 *
 * Note that the step this script covers is the FIRST of two. Claiming the name is what needs a credential and
 * a 2FA prompt; attaching the trusted publisher afterwards is a form on npmjs.com, and is the half that gets
 * skipped -- silently, because nothing fails until CI tries to publish and is answered with a bare `E404`.
 * That is why a re-run against an already-claimed name still prints the instructions rather than declaring
 * the job done.
 *
 * And then it asks, rather than ending on a printed instruction. The release that has to follow the form was
 * the THIRD step and the only one with no owner at all: `create-new-release-branch.ts` stops before it,
 * nothing else runs it, and nothing notices it was skipped -- two branches sat created-but-unreleased from
 * 2026-09-14 for exactly that reason. This script is where the operator is standing when the form is the only
 * thing left, so `helpers/handBack.ts` asks them here and dispatches on a yes. See that file for why a wrong
 * yes is now cheap.
 *
 * The placeholder is published under its own `bootstrap` dist-tag. That does NOT keep it off `latest`: on a
 * brand-new package there is no other version for `latest` to point at, so it holds both (measured
 * 2026-09-14). Installing the name before its first real release therefore gets an empty stub -- a window
 * normally minutes wide, and only wide open when the hand-back above stalls. The real release starts at
 * `1.1.0`, well above the placeholder, so it takes `latest` when it lands and version ordering is unaffected.
 */

import { execFileSync } from 'node:child_process';
import {
  mkdir,
  rm,
  writeFile
} from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

import type { BranchSpec } from './helpers/branchSpec.ts';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { writeJson } from './helpers/exec.ts';
import { offerRelease } from './helpers/handBack.ts';
import {
  getNpmUsername,
  getPackageRegistryState,
  getScopedPackageName,
  getTrustedPublisherInstructions,
  PLACEHOLDER_VERSION,
  REPOSITORY
} from './helpers/npm.ts';

exitIfScriptDisabled();

const BOOTSTRAP_FOLDER = '.bootstrap-tmp';
const PLACEHOLDER_DIST_TAG = 'bootstrap';

async function main(): Promise<void> {
  const [, , obsidianVersionArg, channelArg] = process.argv;
  const obsidianVersion = obsidianVersionArg ?? '';
  const channel = channelArg as BranchSpec['channel'] | undefined;

  if (!obsidianVersion || !channel || !['catalyst', 'public'].includes(channel)) {
    throw new Error('Usage: jiti ./workflow-scripts/bootstrap-new-package.ts <obsidianVersion> <public|catalyst>');
  }

  const packageName = getScopedPackageName({ channel, obsidianVersion });

  const registryState = await getPackageRegistryState(packageName);

  if (registryState === 'released') {
    console.log(`${packageName} already carries a real release, so both halves of this step are long done.`);
    return;
  }

  if (registryState === 'placeholderOnly') {
    console.log(`${packageName} is already claimed, so there is nothing to claim.`);
    console.log('Nothing has ever published through it, though, so its trusted publisher may still be missing.');
    console.log('That is the half of this step that gets skipped; it surfaces in CI as a bare E404 and nowhere else.');
    console.log(getTrustedPublisherInstructions(packageName));
    await offerRelease({ channel, obsidianVersion }, packageName);
    return;
  }

  // Preflight the credential before building or publishing anything. npm answers an *unauthorized* PUT to a
  // package that does not exist yet with **404**, not 401 -- it will not confirm the existence of something you
  // may not read -- so a stale login surfaces as `E404 ... could not be found or you do not have permission`
  // against the very name this script is trying to claim, and reads as a registry-side refusal. (Measured
  // 2026-09-14: the name was genuinely free, `getPackageRegistryState` above said so over an unauthenticated fetch,
  // and the machine's token had simply expired.) The 2FA prompt never appearing is the tell, and asking
  // `npm whoami` first is the cheap way to say so in words.
  //
  // This is deliberately AFTER the existence short-circuit: a re-run against an already-claimed name only
  // prints instructions, and needs no credential at all. That is what makes the script safe to re-run.
  const npmUsername = await getNpmUsername();

  if (!npmUsername) {
    throw new Error(
      `npm rejected this machine's credential, so claiming ${packageName} would fail with a bare E404 that reads`
        + ' as a registry-side refusal. Run `npm login` in this terminal and re-run this script -- it is safe to'
        + ' re-run, and it is the only step in the release path that needs a local npm credential at all.'
    );
  }

  console.log(`Claiming ${packageName} with a ${PLACEHOLDER_VERSION} placeholder, as npm user ${npmUsername}.`);
  console.log('npm will prompt for your 2FA one-time password -- that prompt is the whole point of this step.');

  await publishPlaceholder(packageName);

  console.log(`\nClaimed ${packageName}. That was the first of two steps, and the second is below.`);
  console.log(getTrustedPublisherInstructions(packageName));

  // And the third, which is neither manual nor automatic until somebody owns it. This script is where the
  // operator is standing when the npmjs.com form is the only thing left, and it already holds their terminal
  // for the 2FA prompt above -- so it is the one place that can ask whether the form is saved and act on the
  // answer. Leaving `npm run release` as a printed instruction is what left two branches created-but-
  // unreleased on 2026-09-14.
  await offerRelease({ channel, obsidianVersion }, packageName);
}

async function publishPlaceholder(packageName: string): Promise<void> {
  // Written with Node's own fs rather than the `mkdir -p` / `cat > file << EOF` shell pattern the CI-only
  // scripts use: this one runs on a maintainer's machine, which is as likely to be Windows as not.
  await rm(BOOTSTRAP_FOLDER, { force: true, recursive: true });
  await mkdir(BOOTSTRAP_FOLDER, { recursive: true });

  try {
    const placeholderPackageJson = {
      description: `Placeholder claiming the name for ${packageName}. Replaced by the first real release.`,
      license: 'MIT',
      name: packageName,
      repository: REPOSITORY,
      version: PLACEHOLDER_VERSION
    };

    await writeJson(join(BOOTSTRAP_FOLDER, 'package.json'), placeholderPackageJson);
    await writeFile(
      join(BOOTSTRAP_FOLDER, 'README.md'),
      `# ${packageName}\n\nPlaceholder version reserving this package name. See the first real release for the actual typings.\n`,
      'utf-8'
    );

    // `--access public` is required here and only here. The package does not exist yet, and npm defaults a
    // new *scoped* package to restricted; every other publish in this repo targets a package that is already
    // public and so carries its access forward without the flag. Restricted-to-public is a package-access
    // change, which npm now gates behind an interactive 2FA challenge -- fine for a human at a terminal,
    // impossible for CI, which is exactly why this step is not automated.
    //
    // Not `execFromRoot`: that helper closes the child's stdin immediately, so npm's 2FA prompt would read
    // EOF and the publish would fail without ever showing the prompt. Inheriting the terminal is the point.
    execFileSync('npm', ['publish', '--access', 'public', '--tag', PLACEHOLDER_DIST_TAG], {
      cwd: BOOTSTRAP_FOLDER,
      shell: true,
      stdio: 'inherit'
    });
  } finally {
    await rm(BOOTSTRAP_FOLDER, { force: true, recursive: true });
  }
}

await main();
