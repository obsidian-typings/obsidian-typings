import type { LeafEntry } from "../types.d.ts";

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
    leftRibbon: { hiddenItems: Record<string, boolean>; };
    /**
     * Main (center) workspace leaf
     */
    main: LeafEntry;
    /**
     * Right opened leaf
     */
    right: LeafEntry;
}
