import { FileValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#FileValue} constructor.
 *
 * @returns The {@link obsidian#FileValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getFileValueConstructor(): ExtractConstructor<FileValue> {
  return FileValue as ExtractConstructor<FileValue>;
}
