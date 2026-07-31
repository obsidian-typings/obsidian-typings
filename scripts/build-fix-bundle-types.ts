import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { fixBundleTypes } from './helpers/fix-bundle-types.ts';

exitIfScriptDisabled();

await fixBundleTypes('dist/cjs/types.d.cts');
