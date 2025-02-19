/** @public */
export interface SetHighlightMatch {
    focus: boolean;
    startLoc?: number;
    endLoc?: number;
    line?: number;
    match?: unknown;
}
