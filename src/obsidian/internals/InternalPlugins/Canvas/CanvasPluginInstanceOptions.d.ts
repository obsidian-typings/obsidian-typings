/** @public */
export interface CanvasPluginInstanceOptions {
    cardLabelVisibility?: 'always' | 'hover' | 'never';
    defaultModDragBehavior?: 'card' | 'group' | 'media' | 'menu' | 'note' | 'webpage';
    defaultWheelBehavior?: 'pan' | 'zoom';
    newFileFolderPath?: string;
    newFileLocation?: 'root' | 'current' | 'folder';
    snapToGrid?: boolean;
    snapToObjects?: boolean;
    zoomBreakpoint?: number;
}
