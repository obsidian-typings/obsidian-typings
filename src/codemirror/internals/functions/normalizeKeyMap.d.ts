import type { Cm5KeyMap } from '../Cm5KeyMap.d.ts';

/**
 * Normalizes a key map, expanding multi-stroke key bindings.
 *
 * @param keymap - The key map to normalize.
 * @returns The normalized key map.
 * @public
 * @unofficial
 */
export declare function normalizeKeyMap(keymap: Cm5KeyMap): Cm5KeyMap;
