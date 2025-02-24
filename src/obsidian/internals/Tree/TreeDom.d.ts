import type {
    App,
    Debouncer,
    TFile
} from 'obsidian';
import type { InfinityScroll } from './InfinityScroll.d.ts';
import type { TreeNode } from './TreeNode.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/** @public */
export interface TreeDom<Child> {
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
    resultDomLookup: Map<TFile, Child>;
    showingEmptyState: boolean;
    sortOrder: string;
    vChildren: TreeNodeVChildren<Child, TreeDom<Child>>;
    working: boolean;

    addResult(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;
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
