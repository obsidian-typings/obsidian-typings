import type {
    App,
    Component,
    SearchComponent,
    TFile
} from 'obsidian';
import type { ItemQueue } from '../../Collections/ItemQueue.d.ts';
import type { TreeDom } from '../../Tree/TreeDom.d.ts';
import type { HeaderDom } from './HeaderDom.d.ts';

/**
 * @public
 * @unofficial
 */
export interface BacklinkComponent extends Component {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    backlinkCollapsed: boolean;

    /** @todo Documentation incomplete. */
    backlinkCountEl: HTMLSpanElement;

    /** @todo Documentation incomplete. */
    backlinkDom: TreeDom;

    /** @todo Documentation incomplete. */
    backlinkFile: TFile | null;

    /** @todo Documentation incomplete. */
    backlinkHeaderEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    backlinkQueue: ItemQueue<TFile> | null;

    /** @todo Documentation incomplete. */
    collapseAll: boolean;

    /** @todo Documentation incomplete. */
    collapseAllButtonEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    extraContext: boolean;

    /** @todo Documentation incomplete. */
    extraContextButtonEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    file: TFile | null;

    /** @todo Documentation incomplete. */
    headerDom: HeaderDom;

    /** @todo Documentation incomplete. */
    isShowingSearch: boolean;

    /** @todo Documentation incomplete. */
    searchComponent: SearchComponent;

    /** @todo Documentation incomplete. */
    searchQuery: null;

    /** @todo Documentation incomplete. */
    showSearchButtonEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    sortOrder: string;

    /** @todo Documentation incomplete. */
    tooltipPlacement: string;

    /** @todo Documentation incomplete. */
    unlinkedAliases: string;

    /** @todo Documentation incomplete. */
    unlinkedCollapsed: boolean;

    /** @todo Documentation incomplete. */
    unlinkedCountEl: HTMLSpanElement;

    /** @todo Documentation incomplete. */
    unlinkedDom: TreeDom;

    /** @todo Documentation incomplete. */
    unlinkedFile: null;

    /** @todo Documentation incomplete. */
    unlinkedHeaderEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    unlinkedQueue: null;

    /** @todo Documentation incomplete. */
    addLinkFunction(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    getState(): unknown;

    /** @todo Documentation incomplete. */
    onFileChanged(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onFileDeleted(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onFileRename(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onload(): unknown;

    /** @todo Documentation incomplete. */
    onMetadataChanged(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onResize(): unknown;

    /** @todo Documentation incomplete. */
    onToggleCollapseClick(): unknown;

    /** @todo Documentation incomplete. */
    onToggleMoreContextClick(): unknown;

    /** @todo Documentation incomplete. */
    onToggleShowSearch(): unknown;

    /** @todo Documentation incomplete. */
    passSearchFilter(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    recomputeBacklink(backlinkFile: TFile | null): void;

    /** @todo Documentation incomplete. */
    recomputeUnlinked(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setBacklinkCollapsed(arg1: unknown, arg2: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    setCollapseAll(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setExtraContext(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setSectionCollapsed(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    setShowSearch(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setSortOrder(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setState(arg1: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    setUnlinkedCollapsed(arg1: unknown, arg2: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    stopBacklinkSearch(): void;

    /** @todo Documentation incomplete. */
    stopUnlinkedSearch(): unknown;

    /** @todo Documentation incomplete. */
    toggleBacklinkCollapsed(): unknown;

    /** @todo Documentation incomplete. */
    toggleUnlinkedCollapsed(): unknown;

    /** @todo Documentation incomplete. */
    update(): unknown;

    /** @todo Documentation incomplete. */
    updateHeaderTooltip(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    updateSearch(): unknown;
}
