import { execFromRoot } from './helpers/root.ts';

await execFromRoot('tsc --project ./tsconfig.verify-bundle.json');
