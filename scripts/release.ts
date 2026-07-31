import { createJiti } from 'jiti';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { execFromRoot } from './helpers/root.ts';

exitIfScriptDisabled();

const jiti = createJiti(import.meta.url);

await execFromRoot('git fetch origin');
await execFromRoot('git checkout origin/main -- workflow-scripts');
await execFromRoot('git restore --staged workflow-scripts');
await jiti.import('../workflow-scripts/release.ts');
