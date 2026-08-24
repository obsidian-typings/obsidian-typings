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
 * The placeholder is published under its own dist-tag rather than `latest`, so nothing installing the
 * package in the window before the first real release picks up an empty stub. The real release starts at
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
import {
  doesPackageExist,
  getScopedPackageName,
  REPOSITORY
} from './helpers/npm.ts';

exitIfScriptDisabled();

/* The GitHub coordinates a trusted publisher is pinned to. All packages here publish from the same workflow. */
const GITHUB_OWNER = 'obsidian-typings';
const GITHUB_REPOSITORY = 'obsidian-typings';
const PUBLISH_WORKFLOW_FILE_NAME = 'publish-release.yml';

const BOOTSTRAP_FOLDER = '.bootstrap-tmp';
const PLACEHOLDER_VERSION = '0.0.0';
const PLACEHOLDER_DIST_TAG = 'bootstrap';

async function main(): Promise<void> {
  const obsidianVersion = process.argv[2] ?? '';
  const channel = process.argv[3] as BranchSpec['channel'] | undefined;

  if (!obsidianVersion || !channel || !['catalyst', 'public'].includes(channel)) {
    throw new Error('Usage: jiti ./workflow-scripts/bootstrap-new-package.ts <obsidianVersion> <public|catalyst>');
  }

  const packageName = getScopedPackageName({ channel, obsidianVersion });

  if (await doesPackageExist(packageName)) {
    console.log(`${packageName} already exists on npm, so there is nothing to claim.`);
    printTrustedPublisherInstructions(packageName);
    return;
  }

  console.log(`Claiming ${packageName} with a ${PLACEHOLDER_VERSION} placeholder.`);
  console.log('npm will prompt for your 2FA one-time password -- that prompt is the whole point of this step.');

  await publishPlaceholder(packageName);

  console.log(`\nClaimed ${packageName}.`);
  printTrustedPublisherInstructions(packageName);
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

    await writeFile(join(BOOTSTRAP_FOLDER, 'package.json'), `${JSON.stringify(placeholderPackageJson, null, 2)}\n`, 'utf-8');
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

function printTrustedPublisherInstructions(packageName: string): void {
  console.log([
    '',
    'Now attach the trusted publisher, or CI still will not be able to publish it:',
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
  ].join('\n'));
}

await main();
