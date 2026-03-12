import { execFromRoot } from './helpers/exec.ts';

await execFromRoot('git show origin/main:workflow-scripts/release-beta.ts | bun -');
