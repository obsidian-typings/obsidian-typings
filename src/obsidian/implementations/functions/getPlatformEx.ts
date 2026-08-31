import { Platform } from 'obsidian';

import type { PlatformEx } from '../../internals/PlatformEx.d.ts';

/**
 * Get the {@link obsidian#Platform} constant as {@link PlatformEx}.
 *
 * @returns The platform extension.
 *
 * @public
 * @unofficial
 */
export function getPlatformEx(): PlatformEx {
  return Platform as PlatformEx;
}
