import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { execFromRoot } from './helpers/root.ts';

exitIfScriptDisabled();

await execFromRoot('git show origin/main:workflow-scripts/release-beta.ts | npx -y bun -');
