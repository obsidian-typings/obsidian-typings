import type { WorkspaceLeaf } from 'obsidian';
import type { HoverLinkEventState } from './HoverLinkEventState.d.ts';

/** @todo Documentation incomplete */
/** @public */
export interface HoverLinkEvent {
    event: MouseEvent;
    hoverParent: WorkspaceLeaf;
    linktext: string;
    source: 'search' | 'editor' | 'preview' | 'properties' | 'graph' | 'file-explorer' | 'hover-link';
    sourcePath?: string;
    state?: HoverLinkEventState;
    targetEl: HTMLElement | null;
}
