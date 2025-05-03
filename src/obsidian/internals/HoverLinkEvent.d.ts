import type { WorkspaceLeaf } from 'obsidian';
import type { HoverLinkEventState } from './HoverLinkEventState.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface HoverLinkEvent {
    /** @todo Documentation incomplete. */
    event: MouseEvent;

    /** @todo Documentation incomplete. */
    hoverParent: WorkspaceLeaf;

    /** @todo Documentation incomplete. */
    linktext: string;

    /** @todo Documentation incomplete. */
    source: 'search' | 'editor' | 'preview' | 'properties' | 'graph' | 'file-explorer' | 'hover-link';

    /** @todo Documentation incomplete. */
    sourcePath?: string;

    /** @todo Documentation incomplete. */
    state?: HoverLinkEventState;

    /** @todo Documentation incomplete. */
    targetEl: HTMLElement | null;
}
