import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { resolveToolCommand } from '@mnaoumov/typescript-dev-toolkit/package-manager';
import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

await wrapCliTask(async () => {
  const [, , ...paths] = process.argv;

  if (paths.length === 0) {
    paths.push('**/*');
  }

  await execFromRoot([...resolveToolCommand({ tool: 'dprint' }), 'check', { batchedArguments: paths }]);
});
