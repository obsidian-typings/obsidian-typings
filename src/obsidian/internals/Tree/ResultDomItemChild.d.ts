import type { CachedMetadata } from 'obsidian';
import type { ContentPosition } from './ContentPosition.d.ts';
import type { ResultDomItem } from './ResultDomItem.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';

/**
 * Represents an individual match segment within a search result item.
 * @public
 * @unofficial
 */
export interface ResultDomItemChild extends TreeNode {
    /** Cached metadata for the file containing this match. */
    cache: CachedMetadata;

    /** Text content of the matched region. */
    content: string;

    /** End offset of the match context within the document. */
    end: number;

    /** Layout information used by virtual scrolling. */
    info: TreeNodeInfo;

    /** Array of match positions within the content. */
    matches: ContentPosition[];

    /** Callback to mutate the editor state when navigating to this match. */
    mutateEState: unknown;

    /** Callback for custom rendering of match highlights. */
    onMatchRender: unknown;

    /** Parent result item containing this match child. */
    parent: ResultDomItem;

    /** Reference to the parent result item. */
    parentDom: ResultDomItem;

    /** Element for the "show more context after" button. */
    showMoreAfterEl: HTMLElement;

    /** Element for the "show more context before" button. */
    showMoreBeforeEl: HTMLElement;

    /** Start offset of the match context within the document. */
    start: number;

    /** Get the position of the next match. */
    getNextPos(arg1: unknown): number;

    /** Get the position of the previous match. */
    getPrevPos(arg1: unknown): number;

    /** Handle focus entering this match item. */
    onFocusEnter(event?: UIEvent): void;

    /** Handle focus leaving this match item. */
    onFocusExit(event?: UIEvent): void;

    /** Handle click on this match to navigate to it. */
    onResultClick(event: UIEvent): void;

    /** Render this match with optional surrounding text indicators. */
    render(hasTextBefore: boolean, hasTextAfter: boolean): void;

    /** Expand the context to show more text after the match. */
    showMoreAfter(): void;

    /** Expand the context to show more text before the match. */
    showMoreBefore(): void;

    /** Toggle visibility of the "show more context" buttons. */
    toggleShowMoreContextButtons(): void;
}
