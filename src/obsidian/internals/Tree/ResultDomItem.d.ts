import type { App } from 'electron';
import type { TFile } from 'obsidian';
import type { ResultDomResult } from './ResultDomResult.d.ts';
import type { ResultDom } from './ResultDom.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { ResultDomItemChild } from './ResultDomItemChild.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface ResultDomItem extends TreeNode {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    childrenEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    collapsed: boolean;

    /** @todo Documentation incomplete. */
    collapseEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    collapsible: boolean;

    /** @todo Documentation incomplete. */
    containerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    content: string;

    /** @todo Documentation incomplete. */
    extraContext: boolean;

    /** @todo Documentation incomplete. */
    file: TFile;

    /** @todo Documentation incomplete. */
    info: TreeNodeInfo;

    /** @todo Documentation incomplete. */
    onMatchRender: null;

    /** @todo Documentation incomplete. */
    parent: ResultDom;

    /** @todo Documentation incomplete. */
    parentDom: ResultDom;

    /** @todo Documentation incomplete. */
    pusherEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    result: ResultDomResult;

    /** @todo Documentation incomplete. */
    separateMatches: boolean;

    /** @todo Documentation incomplete. */
    showTitle: boolean;

    /** @todo Documentation incomplete. */
    vChildren: TreeNodeVChildren<ResultDomItem, ResultDomItemChild>;

    /** @todo Documentation incomplete. */
    getMatchExtraPositions(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    invalidate(): unknown;

    /** @todo Documentation incomplete. */
    onCollapseClick(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onResultClick(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onResultContextMenu(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onResultMouseover(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    renderContentMatches(): void;

    /** @todo Documentation incomplete. */
    setCollapse(arg1: unknown, arg2: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    setCollapsible(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setExtraContext(arg1: unknown): unknown;
}
