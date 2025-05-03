import type { ChangeDesc } from '@codemirror/state';
import type { EditorPosition } from 'obsidian';
import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface Bookmark {
    /** @todo Documentation incomplete. */
    assoc: number;

    /** @todo Documentation incomplete. */
    cm: CodeMirrorEditor;

    /** @todo Documentation incomplete. */
    id: number;

    /** @todo Documentation incomplete. */
    offset: number;

    /** @todo Documentation incomplete. */
    clear(): void;

    /** @todo Documentation incomplete. */
    find(): EditorPosition | null;

    /** @todo Documentation incomplete. */
    update(changeDesc: ChangeDesc): void;
}
