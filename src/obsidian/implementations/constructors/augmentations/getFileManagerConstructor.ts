import {
  FileManager
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type FileManagerConstructor = ExtractConstructor<FileManager>;

/**
 * Get the FileManager constructor.
 *
 * @returns The FileManager constructor.
 *
 * @public
 * @unofficial
 */
export function getFileManagerConstructor(): FileManagerConstructor {
  return FileManager as FileManagerConstructor;
}
