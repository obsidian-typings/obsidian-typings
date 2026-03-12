import { execFromRoot } from './helpers/exec.ts';

const BUILD_STEPS = [
  'build:clean',
  'spellcheck',
  'lint',
  'format:check',
  'build:compile',
  'build:generate-index',
  'build:bundle-types',
  'build:fix-bundle-types',
  'build:implementations',
  'build:implementations:generate-types',
  'build:implementations:bundle-types',
  'build:fix-implementations-bundle-types',
  'build:static',
  'build:extract-api'
];

for (const step of BUILD_STEPS) {
  console.log(`Executing ${step}...`);
  await execFromRoot(`npm run ${step}`);
}
