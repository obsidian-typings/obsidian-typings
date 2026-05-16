import type { HookCallback } from './HookCallback.d.ts';

/**
 * Map of hook names to their registered callback arrays.
 *
 * @public
 * @unofficial
 */
export type HookTypes = Record<string, HookCallback[]>;
