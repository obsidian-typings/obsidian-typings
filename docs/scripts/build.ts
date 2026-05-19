import { execFromRoot } from './helpers/exec.ts';

// Generate API docs from release branch sources, then build the static site
const ARGS_START = 2;
await execFromRoot(['jiti', 'scripts/setup.ts']);
await execFromRoot(['astro', 'build', ...process.argv.slice(ARGS_START)]);
