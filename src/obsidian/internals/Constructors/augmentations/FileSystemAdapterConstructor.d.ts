import type { FileSystemAdapter } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The FileSystemAdapter constructor.
 *
 * @public
 * @unofficial
 */
export interface FileSystemAdapterConstructor extends ConstructorBase<[basePath: string], FileSystemAdapter> {}
