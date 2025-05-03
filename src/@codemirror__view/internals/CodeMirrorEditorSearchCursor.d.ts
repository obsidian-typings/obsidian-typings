import type { EditorPosition } from 'obsidian';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface CodeMirrorEditorSearchCursor {
    /** @todo Documentation incomplete. */
    find(reverse?: boolean): boolean;

    /** @todo Documentation incomplete. */
    findNext(): boolean;

    /** @todo Documentation incomplete. */
    findPrevious(): boolean;

    /** @todo Documentation incomplete. */
    from(): EditorPosition | void;

    /** @todo Documentation incomplete. */
    replace(text: string): void;

    /** @todo Documentation incomplete. */
    to(): EditorPosition | void;
}
