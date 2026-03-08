import {
    FileSystemAdapter
} from 'obsidian';
import type { FileSystemAdapterConstructor } from '../../../internals/Constructors/augmentations/FileSystemAdapterConstructor.ts';

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
