import type { LeafEntry } from '../LeafEntry.d.ts';
import type { SerializedWorkspaceLeftRibbon } from './SerializedWorkspaceLeftRibbon.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface SerializedWorkspace {
    /**
     * Last active leaf.
     */
    active: string;

    /**
     * Last opened files.
     */
    lastOpenFiles: string[];

    /**
     * Left opened leaf.
     */
    left: LeafEntry;

    /**
     * Left ribbon.
     */
    leftRibbon: SerializedWorkspaceLeftRibbon;

    /**
     * Main (center) workspace leaf.
     */
    main: LeafEntry;

    /**
     * Right opened leaf.
     */
    right: LeafEntry;
}
