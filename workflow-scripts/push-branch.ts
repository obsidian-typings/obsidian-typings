import { config } from 'dotenv';
import {
  readFile,
  writeFile
} from 'node:fs/promises';
import process from 'node:process';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';

interface BranchSpec {
  channel: 'catalyst' | 'public';
  obsidianVersion: string;
}

interface EnvironmentVariables {
  GITHUB_REF_NAME: string;
}

await wrapCliTask(async () => {
  const environmentVariables = getEnvironmentVariables();
  await assertHeadMatches(environmentVariables.GITHUB_REF_NAME);

  await configureGitUser();
  const branchSpec = validateRefName(environmentVariables.GITHUB_REF_NAME);
  const readmeTemplate = await readFile('./workflow-scripts/README.template.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  const TODO_URL = 'https://obsidian.md/changelog/TODO-SET-CHANGELOG-URL';
  const changelogUrl = (/https:\/\/obsidian\.md\/changelog\/[^"]+/.exec(readme))?.[0] ?? TODO_URL;
  let shouldUpdateReadme = changelogUrl === TODO_URL;
  let updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl);
  if (readme !== updatedReadme) {
    if (!changelogUrl.includes(branchSpec.obsidianVersion)) {
      updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, TODO_URL);
      shouldUpdateReadme = true;
    }
    await writeFile('README.md', updatedReadme, 'utf8');
    await exec('git add README.md');
    await exec('git commit -m "chore: generate README.md from template"');
    await exec('git push');
  }

  if (shouldUpdateReadme) {
    console.log('::error::Please update the changelog URL in the README.md file');
    process.exit(1);
  }
});

async function assertHeadMatches(target: string): Promise<void> {
  const head = await resolveCommitHash('HEAD');
  const want = await resolveCommitHash(target);
  if (head !== want) {
    const headBranch = await exec('git name-rev --name-only HEAD');
    throw new Error(
      `HEAD ${head} (${headBranch}) does not match ${want} (${target}.\nConsider using bun ./workflow-scripts/checkout.ts ${target} --with-scripts`
    );
  }
}

async function configureGitUser(): Promise<void> {
  await exec('git config user.name "github-actions[bot]"');
  await exec('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"');
}

function fillReadmeTemplate(readmeTemplate: string, branchSpec: BranchSpec, changelogUrl: string): string {
  return readmeTemplate
    .replaceAll('{{OBSIDIAN_VERSION}}', branchSpec.obsidianVersion)
    .replaceAll('{{CHANNEL}}', branchSpec.channel)
    .replaceAll('{{CHANGELOG_URL}}', changelogUrl);
}

function getEnvironmentVariables(): EnvironmentVariables {
  config({ path: './workflow-scripts/.env' });
  const environmentVariables = process.env as Partial<EnvironmentVariables>;
  validateEnvironmentVariable(environmentVariables, 'GITHUB_REF_NAME');

  return environmentVariables as EnvironmentVariables;
}

async function resolveCommitHash(target: string): Promise<string> {
  const hash = await exec(`git rev-parse "${target}^{commit}"`);
  return hash.trim();
}

function validateEnvironmentVariable(environmentVariables: Partial<EnvironmentVariables>, variableName: keyof EnvironmentVariables): void {
  if (environmentVariables[variableName]) {
    return;
  }

  throw new Error(`Environment variable ${variableName} is not set. If you are debugging locally, consider setting it in the .env file.`);
}

function validateRefName(refName: string): BranchSpec {
  const REG_EXP = /^release\/obsidian-(?<Channel>public|catalyst)\/(?<Version>\d+\.\d+\.\d+)$/;
  const match = REG_EXP.exec(refName);
  if (!match) {
    throw new Error(
      `GITHUB_REF_NAME "${refName}" is not in the expected format. Expected format: "release/obsidian-public/x.y.z" or "release/obsidian-catalyst/x.y.z"`
    );
  }

  return {
    channel: (match.groups?.['Channel'] ?? 'public') as 'catalyst' | 'public',
    obsidianVersion: match.groups?.['Version'] ?? ''
  };
}
