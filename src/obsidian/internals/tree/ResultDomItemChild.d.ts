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

    /**
     * Get the position of the next match.
     *
     * @returns The next match position.
     */
    getNextPos(arg1: unknown): number;

    /**
     * Get the position of the previous match.
     *
     * @returns The previous match position.
     */
    getPrevPos(arg1: unknown): number;

    /** Layout information used by virtual scrolling. */
    info: TreeNodeInfo;

    /** Array of match positions within the content. */
    matches: ContentPosition[];

    /** Callback to mutate the editor state when navigating to this match. */
    mutateEState: unknown;

    /**
     * Handle focus entering this match item.
     *
     * @param event - The UI event that triggered focus.
     */
    onFocusEnter(event?: UIEvent): void;

    /**
     * Handle focus leaving this match item.
     *
     * @param event - The UI event that triggered focus exit.
     */
    onFocusExit(event?: UIEvent): void;

    /** Callback for custom rendering of match highlights. */
    onMatchRender: unknown;

    /**
     * Handle click on this match to navigate to it.
     *
     * @param event - The UI event that triggered the click.
     */
    onResultClick(event: UIEvent): void;

    /** Parent result item containing this match child. */
    parent: ResultDomItem;

    /** Reference to the parent result item. */
    parentDom: ResultDomItem;

    /**
     * Render this match with optional surrounding text indicators.
     *
     * @param hasTextBefore - Whether there is text before this match.
     * @param hasTextAfter - Whether there is text after this match.
     */
    render(hasTextBefore: boolean, hasTextAfter: boolean): void;

    /** Expand the context to show more text after the match. */
    showMoreAfter(): void;

    /** Element for the "show more context after" button. */
    showMoreAfterEl: HTMLElement;

    /** Expand the context to show more text before the match. */
    showMoreBefore(): void;

    /** Element for the "show more context before" button. */
    showMoreBeforeEl: HTMLElement;

    /** Start offset of the match context within the document. */
    start: number;

    /** Toggle visibility of the "show more context" buttons. */
    toggleShowMoreContextButtons(): void;
}
