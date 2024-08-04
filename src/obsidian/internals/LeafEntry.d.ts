import type {
    SplitDirection,
    ViewState
} from "obsidian";

/** @todo Documentation incomplete */
/** @public */
export interface LeafEntry {
    children?: LeafEntry[];
    direction?: SplitDirection;
    id: string;
    state?: ViewState;
    type: string;
    width?: number;
}
