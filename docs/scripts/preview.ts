import { execFromRoot } from './helpers/root.ts';

const ARGS_START = 2;
await execFromRoot(['astro', 'preview', ...process.argv.slice(ARGS_START)]);
