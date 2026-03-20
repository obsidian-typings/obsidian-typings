import { execFromRoot } from './helpers/exec.ts';

const ARGS_START = 2;
await execFromRoot(['astro', 'build', ...process.argv.slice(ARGS_START)]);
