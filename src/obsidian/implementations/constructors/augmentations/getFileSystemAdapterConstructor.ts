import { FileSystemAdapter } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the FileSystemAdapter constructor.
 *
 * @returns The FileSystemAdapter constructor.
 *
 * @public
 * @unofficial
 */
export function getFileSystemAdapterConstructor(): ExtractConstructor<FileSystemAdapter> {
  return FileSystemAdapter as ExtractConstructor<FileSystemAdapter>;
}
