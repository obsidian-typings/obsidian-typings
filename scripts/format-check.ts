import { execFromRoot } from './helpers/exec.ts';

const [, , ...paths] = process.argv;

if (paths.length === 0) {
  paths.push('**/*');
}

await execFromRoot(['dprint', 'check', ...paths]);
