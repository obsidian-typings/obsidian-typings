import type { App } from 'electron';
import type { TFile } from 'obsidian';
import type { ResultDom } from './ResultDom.d.ts';
import type { ResultDomItemChild } from './ResultDomItemChild.d.ts';
import type { ResultDomResult } from './ResultDomResult.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * Represents a single file's search result in the result DOM tree.
 * @public
 * @unofficial
 */
export interface ResultDomItem extends TreeNode {
    /** Reference to the App instance. */
    app: App;

    /** Container element for child match items. */
    childrenEl: HTMLDivElement;

    /** Whether this result item is currently collapsed. */
    collapsed: boolean;

    /** Element for the collapse/expand toggle. */
    collapseEl: HTMLDivElement;

    /** Whether this result item can be collapsed. */
    collapsible: boolean;

    /** Outer container element for this result item. */
    containerEl: HTMLDivElement;

    /** Text content of the file associated with this result. */
    content: string;

    /** Whether extra surrounding context is shown around matches. */
    extraContext: boolean;

    /** The file associated with this search result. */
    file: TFile;

    /** Layout information used by virtual scrolling. */
    info: TreeNodeInfo;

    /** Callback for custom match rendering, or null if not set. */
    onMatchRender: null;

    /** Parent result DOM container. */
    parent: ResultDom;

    /** Reference to the parent result DOM container. */
    parentDom: ResultDom;

    /** Spacer element used to maintain correct scroll height. */
    pusherEl: HTMLDivElement;

    /** Search result data containing match positions. */
    result: ResultDomResult;

    /** Whether matches are displayed as separate items. */
    separateMatches: boolean;

    /** Whether the file title is shown above matches. */
    showTitle: boolean;

    /** Virtual children manager for match child items. */
    vChildren: TreeNodeVChildren<ResultDomItem, ResultDomItemChild>;

    /**
     * Get additional context positions surrounding a match.
     *
     * @returns The extra context positions.
     */
    getMatchExtraPositions(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /**
     * Mark this result item as needing re-render.
     *
     * @returns The result of the invalidation.
     */
    invalidate(): unknown;

    /**
     * Handle click on the collapse toggle.
     *
     * @returns The result of the click handler.
     */
    onCollapseClick(arg1: unknown): unknown;

    /**
     * Handle click on a search result to navigate to it.
     *
     * @returns The result of the click handler.
     */
    onResultClick(arg1: unknown): unknown;

    /**
     * Handle right-click context menu on a search result.
     *
     * @returns The result of the context menu handler.
     */
    onResultContextMenu(arg1: unknown): unknown;

    /**
     * Handle mouseover on a search result for preview.
     *
     * @returns The result of the mouseover handler.
     */
    onResultMouseover(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** Render the content matches for this result item. */
    renderContentMatches(): void;

    /**
     * Set the collapsed state of this result item.
     *
     * @returns Resolves when the collapse state has been applied.
     */
    setCollapse(arg1: unknown, arg2: unknown): Promise<unknown>;

    /**
     * Set whether this result item can be collapsed.
     *
     * @returns The result of setting the collapsible state.
     */
    setCollapsible(arg1: unknown): unknown;

    /**
     * Set whether extra context is shown around matches.
     *
     * @returns The result of setting extra context.
     */
    setExtraContext(arg1: unknown): unknown;
}
