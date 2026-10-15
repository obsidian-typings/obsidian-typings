import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

await wrapCliTask(async () => {
  await execFromRoot('git show origin/main:workflow-scripts/release-beta.ts | npx -y bun -');
});
