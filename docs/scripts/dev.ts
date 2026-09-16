import { execFromRoot } from './helpers/root.ts';

// Generate API docs from release branch sources, then start the dev server
const ARGS_START = 2;
await execFromRoot(['jiti', 'scripts/setup.ts']);
await execFromRoot(['astro', 'dev', ...process.argv.slice(ARGS_START)]);
