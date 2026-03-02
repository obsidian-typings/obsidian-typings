/**
 * Ephemeral state for a markdown view, storing scroll position.
 * @public
 * @unofficial
 */
export interface MarkdownViewEphemeralState extends Record<string, unknown> {
    /** Scroll position in the view. */
    scroll: number;
}
