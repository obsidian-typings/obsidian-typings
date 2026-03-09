/**
 * User-configurable options for the Canvas plugin.
 * @public
 * @unofficial
 */
export interface CanvasPluginInstanceOptions {
  /** When to display card labels: always, on hover, or never. */
  cardLabelVisibility?: 'always' | 'hover' | 'never';

  /** Default node type created when modifier-dragging onto the canvas. */
  defaultModDragBehavior?: 'card' | 'group' | 'media' | 'menu' | 'note' | 'webpage';

  /** Default mouse wheel behavior: pan or zoom. */
  defaultWheelBehavior?: 'pan' | 'zoom';

  /** Folder path for newly created files from the canvas. */
  newFileFolderPath?: string;

  /** Where to create new files: vault root, current folder, or a specified folder. */
  newFileLocation?: 'root' | 'current' | 'folder';

  /** Whether nodes snap to the grid when moved. */
  snapToGrid?: boolean;

  /** Whether nodes snap to other objects when moved. */
  snapToObjects?: boolean;

  /** Zoom level threshold for switching rendering detail levels. */
  zoomBreakpoint?: number;
}
