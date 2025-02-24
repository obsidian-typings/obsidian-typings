import type {
    App,
    Debouncer,
    TFile
} from 'obsidian';
import type { InfinityScroll } from './InfinityScroll.d.ts';
import type { ResultDom } from './ResultDom.d.ts';
import type { ResultDomResult } from './ResultDomResult.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/** @public */
export interface TreeDom {
    app: App;
    changed: Debouncer<[], unknown>;
    childrenEl: HTMLDivElement;
    collapseAll: boolean;
    el: HTMLDivElement;
    emptyStateEl: HTMLDivElement;
    extraContext: boolean;
    focusedItem: null;
    infinityScroll: InfinityScroll;
    info: TreeNodeInfo;
    pusherEl: HTMLDivElement;
    resultDomLookup: Map<TFile, ResultDom>;
    showingEmptyState: boolean;
    sortOrder: string;
    vChildren: TreeNodeVChildren<ResultDom, TreeDom>;
    working: boolean;

    addResult(file: TFile, result: ResultDomResult, content: string, shouldShowTitle?: boolean): ResultDom;
    changeFocusedItem(arg1: unknown): unknown;
    emptyResults(): unknown;
    getFiles(): unknown;
    getMatchCount(): unknown;
    getResult(arg1: unknown): unknown;
    onChange(): unknown;
    onResize(): unknown;
    removeResult(arg1: unknown): unknown;
    setCollapseAll(arg1: unknown): unknown;
    setExtraContext(arg1: unknown): unknown;
    setFocusedItem(arg1: unknown): unknown;
    startLoader(): unknown;
    stopLoader(): unknown;
    toggle(arg1: unknown, arg2: unknown): Promise<unknown>;
}
