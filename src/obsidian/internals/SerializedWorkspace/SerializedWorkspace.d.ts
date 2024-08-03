import type { LeafEntry } from "../LeafEntry.js";
import type { SerializedWorkspaceLeftRibbonHiddenItemsRecord } from "./SerializedWorkspaceLeftRibbonHiddenItemsRecord.js";

export interface SerializedWorkspace {
    /**
     * Last active leaf
     */
    active: string;
    /**
     * Last opened files
     */
    lastOpenFiles: string[];
    /**
     * Left opened leaf
     */
    left: LeafEntry;
    /**
     * Left ribbon
     */
    leftRibbon: { hiddenItems: SerializedWorkspaceLeftRibbonHiddenItemsRecord };
    /**
     * Main (center) workspace leaf
     */
    main: LeafEntry;
    /**
     * Right opened leaf
     */
    right: LeafEntry;
}
