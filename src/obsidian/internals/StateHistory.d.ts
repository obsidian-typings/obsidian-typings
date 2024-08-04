import type {
    EditorRange,
    ViewState
} from "obsidian";

/** @public */
export interface StateHistory {
    /**
     * Ephemeral cursor state within Editor of leaf
     */
    eState: {
        cursor: EditorRange;
        scroll: number;
    };
    /**
     * Icon of the leaf
     */
    icon?: string;
    /**
     * History of previous and future states of leaf
     */
    leafHistory?: {
        backHistory: StateHistory[];
        forwardHistory: StateHistory[];
    };
    /**
     * Id of parent to which the leaf belonged
     */
    parentId?: string;
    /**
     * Id of root to which the leaf belonged
     */
    rootId?: string;
    /**
     * Last state of the leaf
     */
    state: ViewState;
    /**
     * Title of the leaf
     */
    title?: string;
}
