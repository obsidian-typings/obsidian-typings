import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { execFromRoot } from './helpers/root.ts';

exitIfScriptDisabled();

// `--no-check` disables dts-bundle-generator's own output validation, which forces
// `skipLibCheck: false` and would fail on broken upstream `.d.ts` (e.g. `obsidian.d.ts`). The
// generated bundle is validated instead by `build:validate-bundle-types`, which ignores
// diagnostics that originate outside the bundle.
await execFromRoot('dts-bundle-generator ./src/obsidian/implementations/index.ts --out-file ./dist/cjs/implementations.d.cts --sort --no-check');
