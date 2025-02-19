/** @public */
export interface CanvasPluginInstanceOptions {
    cardLabelVisibility?: 'always' | 'hover' | 'never';
    defaultModDragBehavior?: 'card' | 'group' | 'media' | 'menu' | 'note' | 'webpage';
    defaultWheelBehavior?: 'pan' | 'zoom';
    newFileLocation?: 'root' | 'current' | 'folder';
    newFileFolderPath?: string;
    snapToGrid?: boolean;
    snapToObjects?: boolean;
    zoomBreakpoint?: number;
}
