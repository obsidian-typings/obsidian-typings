import { config } from 'dotenv';
import process from 'node:process';
import { dirname, join } from 'node:path/posix';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

interface EnvironmentVariables {
  GITHUB_REF_NAME: string;
}

interface BranchSpec {
  obsidianVersion: string;
  channel: 'public' | 'catalyst';
}

async function main(): Promise<void> {
  const environmentVariables = getEnvironmentVariables();
  validateRefName(environmentVariables.GITHUB_REF_NAME);

  const __dirname = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');

  const branchSpec = validateRefName(environmentVariables.GITHUB_REF_NAME);
  const readmeTemplate = await readFile(join(__dirname, 'README.template.md'), 'utf8');
  let readme = await readFile('README.md', 'utf8');
  const changelogUrl = readme.match(/https:\/\/obsidian\.md\/changelog\/[^"]+/)?.[1] ?? '';
  if (readme !== fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl)) {
    readme = fillReadmeTemplate(readmeTemplate, branchSpec, 'https://obsidian.md/changelog/TODO-SET-CHANGELOG-URL');
    await writeFile('README.md', readme, 'utf8');
    execSync('git add README.md', { stdio: 'inherit' });
    execSync('git commit -m "chore: generate README.md from template"', { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('::warning file=README.md,line=8,col=14,endColumn=67,title=VALIDATION::Update the changelog URL');
  }

  await writeFile(join(__dirname, 'README.md'), readme);
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
  config();
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
