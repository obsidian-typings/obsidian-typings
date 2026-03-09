import {
  FileValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type FileValueConstructor = ExtractConstructor<FileValue>;

/**
 * Get the FileValue constructor.
 *
 * @returns The FileValue constructor.
 *
 * @public
 * @unofficial
 */
export function getFileValueConstructor(): FileValueConstructor {
  return FileValue as FileValueConstructor;
}
