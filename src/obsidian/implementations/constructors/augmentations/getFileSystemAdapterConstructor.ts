import { FileSystemAdapter } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#FileSystemAdapter} constructor.
 *
 * @returns The {@link obsidian#FileSystemAdapter} constructor.
 *
 * @public
 * @unofficial
 */
export function getFileSystemAdapterConstructor(): ExtractConstructor<FileSystemAdapter> {
  return FileSystemAdapter as ExtractConstructor<FileSystemAdapter>;
}
