/** @todo Documentation incomplete */
export default interface LeafEntry {
    children?: LeafEntry[];
    direction?: SplitDirection;
    id: string;
    state?: ViewState;
    type: string;
    width?: number;
}
