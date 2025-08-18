import { config } from 'dotenv';
import process from 'node:process';
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

interface EnvironmentVariables {
  GITHUB_REF_NAME: string;
}

interface BranchSpec {
  obsidianVersion: string;
  channel: 'public' | 'catalyst';
}

function assertHeadMatches(target: string): void {
  const head = resolveCommitHash("HEAD");
  const want = resolveCommitHash(target);
  if (head !== want) {
    const headBranch = execSync(`git name-rev --name-only HEAD`, { encoding: "utf8" }).trim();
    throw new Error(`HEAD ${head} (${headBranch}) does not match ${want} (${target}. Consider using switch-branch.ts`);
  }
}

function resolveCommitHash(target: string): string {
  return execSync(`git rev-parse "${target}^{commit}"`, { encoding: "utf8" }).trim();
}

async function main(): Promise<void> {
  const environmentVariables = getEnvironmentVariables();
  assertHeadMatches(environmentVariables.GITHUB_REF_NAME);

  configureGitUser();
  const branchSpec = validateRefName(environmentVariables.GITHUB_REF_NAME);
  const readmeTemplate = await readFile('./workflow-scripts/README.template.md', 'utf8');
  console.warn('readmeTemplate\n---\n\n', readmeTemplate);
  let readme = await readFile('README.md', 'utf8');
  console.warn('original readme\n---\n\n', readme);

  const TODO_URL = 'https://obsidian.md/changelog/TODO-SET-CHANGELOG-URL';
  const changelogUrl = readme.match(/https:\/\/obsidian\.md\/changelog\/[^"]+/)?.[0] ?? TODO_URL;
  console.warn('changelogUrl\n---\n\n', changelogUrl);
  let shouldUpdateReadme = changelogUrl === TODO_URL;
  if (readme !== fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl)) {
    if (!changelogUrl.includes(branchSpec.obsidianVersion)) {
      readme = fillReadmeTemplate(readmeTemplate, branchSpec, TODO_URL);
      shouldUpdateReadme = true;
    }
    console.warn('updated readme\n---\n\n', readme);
    await writeFile('README.md', readme, 'utf8');
    execSync('git add README.md', { stdio: 'inherit' });
    execSync('git commit -m "chore: generate README.md from template"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
  }

  if (shouldUpdateReadme) {
    console.log('::error::Please update the changelog URL in the README.md file');
    process.exit(1);
  }
}

function configureGitUser(): void {
  execSync('git config user.name "github-actions[bot]"', { stdio: 'inherit' });
  execSync('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"', { stdio: 'inherit' });
}

function fillReadmeTemplate(readmeTemplate: string, branchSpec: BranchSpec, changelogUrl: string): string {
  return readmeTemplate
    .replaceAll('{{OBSIDIAN_VERSION}}', branchSpec.obsidianVersion)
    .replaceAll('{{CHANNEL}}', branchSpec.channel)
    .replaceAll('{{CHANGELOG_URL}}', changelogUrl);
}

function validateRefName(refName: string): BranchSpec {
  const REG_EXP = /^release\/obsidian-(?<Channel>public|catalyst)\/(?<Version>\d+\.\d+\.\d+)$/;
  const match = refName.match(REG_EXP);
  if (!match) {
    throw new Error(`GITHUB_REF_NAME "${refName}" is not in the expected format. Expected format: "release/obsidian-public/x.y.z" or "release/obsidian-catalyst/x.y.z"`);
  }

  return {
    obsidianVersion: match.groups?.['Version'] ?? '',
    channel: (match.groups?.['Channel'] ?? 'public') as 'public' | 'catalyst'
  };
}

function getEnvironmentVariables(): EnvironmentVariables {
  config({ path: './workflow-scripts/.env' });
  const environmentVariables = process.env as Partial<EnvironmentVariables>;
  validateEnvironmentVariable(environmentVariables, 'GITHUB_REF_NAME');

  return environmentVariables as EnvironmentVariables;
}

function validateEnvironmentVariable(environmentVariables: Partial<EnvironmentVariables>, variableName: keyof EnvironmentVariables): void {
  if (environmentVariables[variableName]) {
    return;
  }

  throw new Error(`Environment variable ${variableName} is not set. If you are debugging locally, consider setting it in the .env file.`);
}

await main();
