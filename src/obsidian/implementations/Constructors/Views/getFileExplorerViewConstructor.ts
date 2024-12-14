import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { FileExplorerView } from '../../../internals/InternalPlugins/FileExplorer/FileExplorerView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the FileExplorerView constructor.
 *
 * @returns The FileExplorerView constructor.
 * @public
 */
export function getFileExplorerViewConstructor(app: App): TypedViewConstructor<FileExplorerView> {
    return getViewConstructorByViewType(app, ViewType.FileExplorer) as TypedViewConstructor<FileExplorerView>;
}
