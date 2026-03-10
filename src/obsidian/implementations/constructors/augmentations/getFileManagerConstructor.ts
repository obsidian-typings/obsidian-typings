import {
  FileManager
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the FileManager constructor.
 *
 * @returns The FileManager constructor.
 *
 * @public
 * @unofficial
 */
export function getFileManagerConstructor(): ExtractConstructor<FileManager> {
  return FileManager as ExtractConstructor<FileManager>;
}
