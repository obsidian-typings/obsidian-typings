import type { TAbstractFile } from 'obsidian';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface Draggable {
    /** @todo Documentation incomplete. */
    file?: TAbstractFile;

    /** @todo Documentation incomplete. */
    files?: TAbstractFile[];

    /** @todo Documentation incomplete. */
    icon: string;

    /** @todo Documentation incomplete. */
    linktext?: string;

    /** @todo Documentation incomplete. */
    source?: unknown;

    /** @todo Documentation incomplete. */
    sourcePath?: string;

    /** @todo Documentation incomplete. */
    title: string;

    /** @todo Documentation incomplete. */
    type: string;
}
