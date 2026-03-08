/**
 * Information about the initial drag start event.
 * @public
 * @unofficial
 */
export interface DragStartEvent {
    /** The original drag event. */
    evt: DragEvent;

    /** Whether the dragged item has moved from its starting position. */
    moved: boolean;
}
