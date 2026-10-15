import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';
import { createJiti } from 'jiti';

await wrapCliTask(async () => {
  const jiti = createJiti(import.meta.url);

  await execFromRoot('git fetch origin');
  await execFromRoot('git checkout origin/main -- workflow-scripts');
  await execFromRoot('git restore --staged workflow-scripts');
  await jiti.import('../workflow-scripts/release.ts');
});
