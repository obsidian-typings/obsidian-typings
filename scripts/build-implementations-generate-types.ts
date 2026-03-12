import { execFromRoot } from './helpers/exec.ts';

await execFromRoot('tsc --project ./tsconfig.implementations.json');
