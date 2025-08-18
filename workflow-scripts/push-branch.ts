import { config } from 'dotenv';
import process from 'node:process';
import { wrapCliTask } from 'obsidian-dev-utils/ScriptUtils/CliUtils';

import { parseBranchSpec } from './modules/branchSpec.ts';
import { assertHeadMatches } from './modules/git.ts';
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
    throw new Error('Execution failed');
  }
});

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
