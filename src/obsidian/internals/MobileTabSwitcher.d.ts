import type {
    App,
    Debouncer
} from 'obsidian';

/** @public */
export interface MobileTabSwitcher {
    app: App;
    cacheDir: string;
    containerEl: HTMLDivElement;
    innerScrollEl: HTMLDivElement;
    isVisible: boolean;
    requestRender: Debouncer<[], void>;
    scrollEl: HTMLDivElement;
    tabPreviewLookup: WeakMap<object, unknown>;

    close(): void;
    hide(): void;
    onLayoutChange(): void;
    render(): void;
    setupCacheDir(): Promise<void>;
    show(): Promise<void>;
    showTabManagementMenu(e: MouseEvent): void;
}
