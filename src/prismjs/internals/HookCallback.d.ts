import type { Environment } from './Environment.d.ts';

/**
 * Callback function invoked by a Prism hook.
 *
 * @public
 * @unofficial
 */
export type HookCallback = (env: Environment) => void;
