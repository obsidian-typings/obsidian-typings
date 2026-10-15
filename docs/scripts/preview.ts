import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

const ARGS_START = 2;
await execFromRoot(['astro', 'preview', ...process.argv.slice(ARGS_START)]);
