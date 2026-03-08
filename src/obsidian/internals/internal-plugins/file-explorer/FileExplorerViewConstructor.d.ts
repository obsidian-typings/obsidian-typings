import type { FileExplorerView } from '../../internal-plugins/file-explorer/FileExplorerView.d.ts';
import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';

/**
 * Constructor interface for creating FileExplorerView instances.
 * @public
 * @unofficial
 */
export interface FileExplorerViewConstructor extends TypedViewConstructor<FileExplorerView> {}
