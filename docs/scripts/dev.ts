import { execFromRoot } from './helpers/exec.ts';

const ARGS_START = 2;
await execFromRoot(['astro', 'dev', ...process.argv.slice(ARGS_START)]);
