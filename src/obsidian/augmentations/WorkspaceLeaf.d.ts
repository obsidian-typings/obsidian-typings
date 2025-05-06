export {};

declare module 'obsidian' {
    /**
     * Workspace leaf.
     */
    interface WorkspaceLeaf extends WorkspaceItem, HoverParent {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        activeTime?: number;

        /**
         * The hover popover associated with this leaf.
         *
         * @official
         */
        hoverPopover: HoverPopover | null;

        /**
         * The direct parent of the leaf.
         *
         * On desktop, a leaf is always a child of a `WorkspaceTabs` component.
         * On mobile, a leaf might be a child of a `WorkspaceMobileDrawer`.
         * Perform an `instanceof` check before making an assumption about the
         * `parent`.
         *
         * @official
         */
        parent: WorkspaceTabs | WorkspaceMobileDrawer;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        tabHeaderEl: HTMLElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        tabHeaderInnerIconEl: HTMLElement;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        tabHeaderInnerTitleEl: HTMLElement;

        /**
         * The view associated with this leaf. Do not attempt to cast this to your
         * custom `View` without first checking `instanceof`.
         *
         * @official
         */
        view: View;

        /**
         * Detach this leaf from its parent.
         *
         * @official
         */
        detach(): void;

        /**
         * Get the display text of this leaf.
         *
         * @returns The display text of the leaf.
         * @official
         */
        getDisplayText(): string;

        /**
         * Get the ephemeral state of this leaf.
         *
         * @returns The ephemeral state of the leaf.
         * @official
         */
        getEphemeralState(): any;

        /**
         * Get the icon of this leaf.
         *
         * @returns The icon of the leaf.
         * @official
         */
        getIcon(): IconName;

        /**
         * Get the view state of this leaf.
         *
         * @official
         */
        getViewState(): ViewState;

        /**
         * Returns `true` if this leaf is currently deferred because it is in the background.
         * A deferred leaf will have a DeferredView as its view, instead of the View that
         * it should normally have for its type (like MarkdownView for the `markdown` type).
         *
         * @returns Whether the leaf is deferred.
         * @since 1.7.2
         * @official
         * @deprecated - Added only for typing purposes. Use {@link isDeferred} instead.
         */
        isDeferred__?(): boolean;

        /**
         * If this view is currently deferred, load it and await that it has fully loaded.
         *
         * @returns A promise that resolves when the leaf is loaded.
         * @since 1.7.2
         * @official
         */
        loadIfDeferred(): Promise<void>;

        /**
         * Handle the group-change event.
         *
         * @param name - Should be `'group-change'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * leaf.on('group-change', (group) => {
         *     console.log(group);
         * });
         * ```
         * @official
         */
        on(name: 'group-change', callback: (group: string) => any, ctx?: any): EventRef;

        /**
         * Triggers when the leaf's history gets updated (e.g. when new file is opened, or moving through history).
         *
         * @unofficial
         */
        on(name: 'history-change', callback: () => void, ctx?: unknown): EventRef;

        /**
         * Triggers when context menu action is executed on the leaf.
         *
         * @unofficial
         */
        on(name: 'leaf-menu', callback: (menu: Menu, leaf: WorkspaceLeaf) => void, ctx?: unknown): EventRef;

        /**
         * Handle the pinned-change event.
         *
         * @param name - Should be `'pinned-change'`.
         * @param callback - The callback function.
         * @param ctx - The context passed as `this` to the `callback` function.
         * @returns The event reference.
         * @example
         * ```ts
         * leaf.on('pinned-change', (pinned) => {
         *     console.log(pinned);
         * });
         * ```
         * @official
         */
        on(name: 'pinned-change', callback: (pinned: boolean) => any, ctx?: any): EventRef;

        /**
         * Handle the resize event.
         *
         * @official
         */
        onResize(): void;

        /**
         * Open a view in this leaf.
         *
         * @param view - The view to open.
         * @returns A promise that resolves to the opened view.
         * @official
         */
        open(view: View): Promise<View>;

        /**
         * Open a file in this leaf.
         *
         * @param file - The file to open.
         * @param openState - The open state of the file.
         * @returns A promise that resolves when the file is opened.
         * @official
         */
        openFile(file: TFile, openState?: OpenViewState): Promise<void>;

        /**
         * Open a link in the current leaf.
         *
         * @param linktext - The link text to open.
         * @param sourcePath - The path of the source file.
         * @param openViewState - The view state to open the link in.
         * @unofficial
         */
        openLinkText(linktext: string, sourcePath: string, openViewState?: OpenViewState): Promise<void>;

        /**
         * Set the vertical height a leaf may occupy if it is in a split. The height is not set directly, but.
         *
         * by setting the flex-grow (css) of the element. This means to predictably affect the height, you.
         * also need to use setDimension on the other leafs of the column. (The flex-grow values of every leaf.
         * work basically like a ratio, e.g. 1:2 meaning the first leaf takes 33% of the height, and the.
         * second 67%.).
         *
         * @param flexgrow - Sets the flex-grow of the leaf. (0-100).
         * @unofficial
         */
        setDimension(flexgrow?: number | null): void;

        /**
         * Set the ephemeral state of this leaf.
         *
         * @param state - The ephemeral state to set.
         * @official
         */
        setEphemeralState(state: any): void;

        /**
         * Set the group of this leaf.
         *
         * @param group - The group to set.
         * @official
         */
        setGroup(group: string): void;

        /**
         * Set the group of this leaf.
         *
         * @param group - The group to set.
         * @official
         */
        setGroupMember(other: WorkspaceLeaf): void;

        /**
         * Set the pinned state of this leaf.
         *
         * @param pinned - Whether the leaf should be pinned.
         * @official
         */
        setPinned(pinned: boolean): void;

        /**
         * Set the view state of this leaf.
         *
         * @param viewState - The view state to set.
         * @param eState - The ephemeral state to set.
         * @official
         */
        setViewState(viewState: ViewState, eState?: any): Promise<void>;

        /**
         * Toggle the pinned state of this leaf.
         *
         * @official
         */
        togglePinned(): void;
    }
}
