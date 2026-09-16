import { exitIfScriptDisabled } from '../helpers/env-toggle.ts';
import { execFromRoot } from '../helpers/exec.ts';

exitIfScriptDisabled();

await execFromRoot(['tsc', '--noEmit']);
