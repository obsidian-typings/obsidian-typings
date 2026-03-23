import { createJiti } from 'jiti';

import { execFromRoot } from './helpers/exec.ts';

const jiti = createJiti(import.meta.url);

await execFromRoot('git fetch origin');
await execFromRoot('git checkout origin/main -- workflow-scripts');
await execFromRoot('git restore --staged workflow-scripts');
await jiti.import('../workflow-scripts/release.ts');
