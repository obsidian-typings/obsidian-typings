/**
 * @public
 * @unofficial
 */
export interface CanvasPluginInstanceOptions {
    /**
     * @todo Documentation incomplete.
     */
    cardLabelVisibility?: 'always' | 'hover' | 'never';

    /**
     * @todo Documentation incomplete.
     */
    defaultModDragBehavior?: 'card' | 'group' | 'media' | 'menu' | 'note' | 'webpage';

    /**
     * @todo Documentation incomplete.
     */
    defaultWheelBehavior?: 'pan' | 'zoom';

    /**
     * @todo Documentation incomplete.
     */
    newFileFolderPath?: string;

    /**
     * @todo Documentation incomplete.
     */
    newFileLocation?: 'root' | 'current' | 'folder';

    /**
     * @todo Documentation incomplete.
     */
    snapToGrid?: boolean;

    /**
     * @todo Documentation incomplete.
     */
    snapToObjects?: boolean;

    /**
     * @todo Documentation incomplete.
     */
    zoomBreakpoint?: number;
}
