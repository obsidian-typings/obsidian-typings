import { spawnSync } from 'child_process';

const BUILD_STEPS = [
  'build:clean',
  'build:compile',
  'build:generate-index',
  'build:bundle-types',
  'build:fix-bundle-types',
  'build:implementations',
  'build:implementations:generate-types',
  'build:implementations:bundle-types',
  'build:fix-implementations-bundle-types',
  'build:static',
  'build:extract-api',
];

for (const step of BUILD_STEPS) {
  console.log(`Executing ${step}...`);
  const result = spawnSync(`npm run ${step}`,
    { stdio: 'inherit', shell: true }
  );
  if (result.status !== 0) {
    console.error(`Error executing ${step}: ${result.stderr}`);
    process.exit(result.status ?? 1);
  }
}

process.exit(0);
