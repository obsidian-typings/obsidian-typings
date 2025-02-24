import type {
    App,
    Component,
    SearchComponent,
    TFile
} from 'obsidian';
import type { ItemQueue } from '../../Collections/ItemQueue.d.ts';
import type { TreeDom } from '../../Tree/TreeDom.d.ts';
import type { HeaderDom } from './HeaderDom.d.ts';
import type { ResultDom } from './ResultDom.d.ts';

/** @public */
export interface BacklinkComponent extends Component {
    app: App;
    backlinkCollapsed: boolean;
    backlinkCountEl: HTMLSpanElement;
    backlinkDom: TreeDom<ResultDom>;
    backlinkFile: TFile | null;
    backlinkHeaderEl: HTMLDivElement;
    backlinkQueue: ItemQueue<TFile> | null;
    collapseAll: boolean;
    collapseAllButtonEl: HTMLDivElement;
    extraContext: boolean;
    extraContextButtonEl: HTMLDivElement;
    file: TFile | null;
    headerDom: HeaderDom;
    isShowingSearch: boolean;
    searchComponent: SearchComponent;
    searchQuery: null;
    showSearchButtonEl: HTMLDivElement;
    sortOrder: string;
    tooltipPlacement: string;
    unlinkedAliases: string;
    unlinkedCollapsed: boolean;
    unlinkedCountEl: HTMLSpanElement;
    unlinkedDom: TreeDom<ResultDom>;
    unlinkedFile: null;
    unlinkedHeaderEl: HTMLDivElement;
    unlinkedQueue: null;

    addLinkFunction(arg1: unknown, arg2: unknown, arg3: unknown): unknown;
    getState(): unknown;
    onFileChanged(arg1: unknown): unknown;
    onFileDeleted(arg1: unknown): unknown;
    onFileRename(arg1: unknown): unknown;
    onload(): unknown;
    onMetadataChanged(arg1: unknown): unknown;
    onResize(): unknown;
    onToggleCollapseClick(): unknown;
    onToggleMoreContextClick(): unknown;
    onToggleShowSearch(): unknown;
    passSearchFilter(arg1: unknown, arg2: unknown): unknown;
    recomputeBacklink(backlinkFile: TFile): void;
    recomputeUnlinked(arg1: unknown): unknown;
    setBacklinkCollapsed(arg1: unknown, arg2: unknown): Promise<unknown>;
    setCollapseAll(arg1: unknown): unknown;
    setExtraContext(arg1: unknown): unknown;
    setSectionCollapsed(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): Promise<unknown>;
    setShowSearch(arg1: unknown): unknown;
    setSortOrder(arg1: unknown): unknown;
    setState(arg1: unknown): Promise<unknown>;
    setUnlinkedCollapsed(arg1: unknown, arg2: unknown): Promise<unknown>;
    stopBacklinkSearch(): void;
    stopUnlinkedSearch(): unknown;
    toggleBacklinkCollapsed(): unknown;
    toggleUnlinkedCollapsed(): unknown;
    update(): unknown;
    updateHeaderTooltip(arg1: unknown, arg2: unknown): unknown;
    updateSearch(): unknown;
}
