import { execFromRoot } from './helpers/root.ts';

const [, , ...paths] = process.argv;

if (paths.length === 0) {
  paths.push('**/*');
}

await execFromRoot(['dprint', 'fmt', ...paths]);
