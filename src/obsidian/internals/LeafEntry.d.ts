import type {
    SplitDirection,
    ViewState
} from 'obsidian';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface LeafEntry {
    /**
     * @todo Documentation incomplete.
     */
    children?: LeafEntry[];

    /**
     * @todo Documentation incomplete.
     */
    direction?: SplitDirection;

    /**
     * @todo Documentation incomplete.
     */
    id: string;

    /**
     * @todo Documentation incomplete.
     */
    state?: ViewState;

    /**
     * @todo Documentation incomplete.
     */
    type: string;

    /**
     * @todo Documentation incomplete.
     */
    width?: number;
}
