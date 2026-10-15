import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { getPackageManagerRunCommand } from '@mnaoumov/typescript-dev-toolkit/package-manager';
import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

await wrapCliTask(async () => {
  const BUILD_STEPS = [
    'build:clean',
    'spellcheck',
    'lint',
    'format:check',
    'build:validate-augmentation-coverage',
    'build:compile',
    'build:validate-types',
    'build:generate-index',
    'build:bundle-types',
    'build:fix-bundle-types',
    'build:implementations',
    'build:implementations:generate-types',
    'build:implementations:bundle-types',
    'build:fix-implementations-bundle-types',
    'build:copy-esm-bundle-types',
    'build:validate-bundle-types',
    'build:extract-api',
    'build:validate-bundle'
  ];

  for (const step of BUILD_STEPS) {
    console.log(`Executing ${step}...`);
    await execFromRoot([...getPackageManagerRunCommand(), step]);
  }
});
