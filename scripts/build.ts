import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { execFromRoot } from './helpers/root.ts';

exitIfScriptDisabled();

const BUILD_STEPS = [
  'build:clean',
  'spellcheck',
  'lint',
  'format:check',
  'build:compile',
  'build:validate-types',
  'build:generate-index',
  'build:bundle-types',
  'build:fix-bundle-types',
  'build:implementations',
  'build:implementations:generate-types',
  'build:implementations:bundle-types',
  'build:fix-implementations-bundle-types',
  'build:validate-bundle-types',
  'build:static',
  'build:extract-api',
  'build:validate-bundle'
];

for (const step of BUILD_STEPS) {
  console.log(`Executing ${step}...`);
  await execFromRoot(`npm run ${step}`);
}
