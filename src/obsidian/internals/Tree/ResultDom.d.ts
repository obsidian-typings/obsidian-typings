import type { App } from 'electron';
import type { TFile } from 'obsidian';
import type { ResultDomResult } from './ResultDomResult.d.ts';
import type { TreeDom } from './TreeDom.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/** @public */
export interface ResultDom {
    app: App;
    childrenEl: HTMLDivElement;
    collapsed: boolean;
    collapseEl: HTMLDivElement;
    collapsible: boolean;
    containerEl: HTMLDivElement;
    content: string;
    el: HTMLDivElement;
    extraContext: boolean;
    file: TFile;
    info: TreeNodeInfo;
    onMatchRender: null;
    parent: TreeDom;
    parentDom: TreeDom;
    pusherEl: HTMLDivElement;
    result: ResultDomResult;
    separateMatches: boolean;
    showTitle: boolean;
    vChildren: TreeNodeVChildren<ResultDom, ResultDom>;

    getMatchExtraPositions(arg1: unknown, arg2: unknown, arg3: unknown): unknown;
    invalidate(): unknown;
    onCollapseClick(arg1: unknown): unknown;
    onResultClick(arg1: unknown): unknown;
    onResultContextMenu(arg1: unknown): unknown;
    onResultMouseover(arg1: unknown, arg2: unknown, arg3: unknown): unknown;
    renderContentMatches(): void;
    setCollapse(arg1: unknown, arg2: unknown): Promise<unknown>;
    setCollapsible(arg1: unknown): unknown;
    setExtraContext(arg1: unknown): unknown;
}
