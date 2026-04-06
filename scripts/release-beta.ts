import { execFromRoot } from './helpers/root.ts';

await execFromRoot('git show origin/main:workflow-scripts/release-beta.ts | npx -y bun -');
