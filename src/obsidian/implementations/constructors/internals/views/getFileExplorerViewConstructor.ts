import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { FileExplorerView } from '../../../../internals/internal-plugins/file-explorer/FileExplorerView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the FileExplorerView constructor.
 *
 * @param app - The app.
 * @returns The FileExplorerView constructor.
 *
 * @public
 * @unofficial
 */
export function getFileExplorerViewConstructor(app: App): ExtractConstructor<FileExplorerView> {
    return getViewConstructorByViewType(app, ViewType.FileExplorer);
}
