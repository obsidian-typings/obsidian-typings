import { config } from 'dotenv';
import process from 'node:process';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';
import { exec } from 'obsidian-dev-utils/ScriptUtils/Exec';

import { parseBranchSpec } from './modules/branchSpec.ts';
import { generateReadme } from './modules/readmeGenerator.ts';

interface EnvironmentVariables {
  GITHUB_REF_NAME: string;
}

await wrapCliTask(async () => {
  const environmentVariables = getEnvironmentVariables();
  await assertHeadMatches(environmentVariables.GITHUB_REF_NAME);

  const branchSpec = parseBranchSpec(environmentVariables.GITHUB_REF_NAME);
  const shouldUpdateReadme = await generateReadme(branchSpec);
  if (shouldUpdateReadme) {
    console.log('::error::Please update the changelog URL in the README.md file');
    process.exit(1); // TODO: remove this
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
