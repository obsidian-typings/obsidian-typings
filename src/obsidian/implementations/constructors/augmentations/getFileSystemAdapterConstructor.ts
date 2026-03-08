import {
    FileSystemAdapter
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type FileSystemAdapterConstructor = ExtractConstructor<FileSystemAdapter>;

/**
 * Get the FileSystemAdapter constructor.
 *
 * @returns The FileSystemAdapter constructor.
 *
 * @public
 * @unofficial
 */
export function getFileSystemAdapterConstructor(): FileSystemAdapterConstructor {
    return FileSystemAdapter as FileSystemAdapterConstructor;
}
