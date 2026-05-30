import { Notice } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Notice} constructor.
 *
 * @returns The {@link obsidian#Notice} constructor.
 *
 * @public
 * @unofficial
 */
export function getNoticeConstructor(): ExtractConstructor<Notice> {
  return Notice as ExtractConstructor<Notice>;
}
