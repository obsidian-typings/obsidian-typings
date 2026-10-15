import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { resolveToolCommand } from '@mnaoumov/typescript-dev-toolkit/package-manager';
import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

await wrapCliTask(async () => {
  // `--no-check` disables dts-bundle-generator's own output validation, which forces
  // `skipLibCheck: false` and would fail on broken upstream `.d.ts` (e.g. `obsidian.d.ts`). The
  // generated bundle is validated instead by `build:validate-bundle-types`, which ignores
  // diagnostics that originate outside the bundle.
  await execFromRoot([
    ...resolveToolCommand({ tool: 'dts-bundle-generator' }),
    './src/obsidian/implementations/index.ts',
    '--out-file',
    './dist/cjs/implementations.d.cts',
    '--sort',
    '--no-check'
  ]);
});
