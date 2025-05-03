import type {
    App,
    Debouncer,
    TFile
} from 'obsidian';
import type { InfinityScroll } from './InfinityScroll.d.ts';
import type { ResultDomItem } from './ResultDomItem.d.ts';
import type { ResultDomResult } from './ResultDomResult.d.ts';
import type { TreeNodeInfo } from './TreeNodeInfo.d.ts';
import type { TreeNodeVChildren } from './TreeNodeVChildren.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ResultDom {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    changed: Debouncer<[], unknown>;

    /** @todo Documentation incomplete. */
    childrenEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    collapseAll: boolean;

    /** @todo Documentation incomplete. */
    el: HTMLDivElement;

    /** @todo Documentation incomplete. */
    emptyStateEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    extraContext: boolean;

    /** @todo Documentation incomplete. */
    focusedItem: null;

    /** @todo Documentation incomplete. */
    infinityScroll: InfinityScroll;

    /** @todo Documentation incomplete. */
    info: TreeNodeInfo;

    /** @todo Documentation incomplete. */
    pusherEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    resultDomLookup: Map<TFile, ResultDomItem>;

    /** @todo Documentation incomplete. */
    showingEmptyState: boolean;

    /** @todo Documentation incomplete. */
    sortOrder: string;

    /** @todo Documentation incomplete. */
    vChildren: TreeNodeVChildren<ResultDomItem, ResultDom>;

    /** @todo Documentation incomplete. */
    working: boolean;

    /** @todo Documentation incomplete. */
    addResult(file: TFile, result: ResultDomResult, content: string, shouldShowTitle?: boolean): ResultDomItem;

    /** @todo Documentation incomplete. */
    changeFocusedItem(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    emptyResults(): unknown;

    /** @todo Documentation incomplete. */
    getFiles(): unknown;

    /** @todo Documentation incomplete. */
    getMatchCount(): number;

    /** @todo Documentation incomplete. */
    getResult(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onChange(): unknown;

    /** @todo Documentation incomplete. */
    onResize(): unknown;

    /** @todo Documentation incomplete. */
    removeResult(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setCollapseAll(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setExtraContext(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setFocusedItem(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    startLoader(): unknown;

    /** @todo Documentation incomplete. */
    stopLoader(): unknown;

    /** @todo Documentation incomplete. */
    toggle(arg1: unknown, arg2: unknown): Promise<unknown>;
}
