import { execFromRoot } from './helpers/root.ts';

// Clean, generate API docs from release branch sources, then build the static site
const ARGS_START = 2;
await execFromRoot(['jiti', 'scripts/clean.ts']);
await execFromRoot(['jiti', 'scripts/setup.ts']);
await execFromRoot(['jiti', 'scripts/generate-og-images.ts']);
await execFromRoot(['astro', 'build', ...process.argv.slice(ARGS_START)]);
