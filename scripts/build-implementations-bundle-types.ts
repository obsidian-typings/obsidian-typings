import { spawnSync } from 'child_process';

const result = spawnSync(
  'dts-bundle-generator ./src/obsidian/implementations/index.ts --out-file ./dist/cjs/implementations.d.cts --sort --no-check',
  { stdio: 'inherit', shell: true }
);
process.exit(result.status ?? 1);
