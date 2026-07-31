import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { execFromRoot } from './helpers/root.ts';

exitIfScriptDisabled();

await execFromRoot('tsc --project ./tsconfig.implementations.json');
