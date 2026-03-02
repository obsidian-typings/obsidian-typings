import type { FileExplorerView } from '../../InternalPlugins/FileExplorer/FileExplorerView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';

/**
 * Constructor interface for creating FileExplorerView instances.
 * @public
 * @unofficial
 */
export interface FileExplorerViewConstructor extends TypedViewConstructor<FileExplorerView> {}
