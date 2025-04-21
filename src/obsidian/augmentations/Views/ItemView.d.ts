export {};

declare module 'obsidian' {
    /**
     * A view that displays an item.
     */
    interface ItemView extends View {
        /**
         * Container of actions for the view.
         *
         * @unofficial
         */
        actionsEl: HTMLElement;

        /**
         * Back button element for changing view history.
         *
         * @unofficial
         */
        backButtonEl: HTMLButtonElement;

        /**
         * Whether the view may be dropped anywhere in workspace.
         *
         * @unofficial
         */
        canDropAnywhere: boolean;

        /**
         * The parent element of the content.
         *
         * @official
         */
        contentEl: HTMLElement;

        /**
         * Forward button element for changing view history.
         *
         * @unofficial
         */
        forwardButtonEl: HTMLButtonElement;

        /**
         * Header bar container of view.
         *
         * @unofficial
         */
        headerEl: HTMLElement;

        /**
         * Icon element for the view (for dragging).
         *
         * @unofficial
         */
        iconEl: HTMLElement;

        /**
         * Anchor button for revealing more view actions.
         *
         * @unofficial
         */
        moreOptionsButtonEl: HTMLAnchorElement;

        /**
         * Container for the title of the view.
         *
         * @unofficial
         */
        titleContainerEl: HTMLElement;

        /**
         * Title element for the view.
         *
         * @unofficial
         */
        titleEl: HTMLElement;

        /**
         * Title of the parent.
         *
         * @remark Used for breadcrumbs rendering.
         * @unofficial
         */
        titleParentEl: HTMLElement;

        /**
         * Adds an action button to the header of the view.
         *
         * @param icon - The icon for the action.
         * @param title - The title for the action.
         * @param callback - Callback to execute on click.
         * @unofficial
         */
        addAction(icon: IconName, title: string, callback: (evt: MouseEvent) => any): HTMLElement;

        /**
         * Add an action to the item view.
         *
         * @param icon - The icon of the action.
         * @param title - The title of the action.
         * @param callback - The callback to call when the action is clicked.
         * @returns The DOM element of the action.
         * @example
         * ```ts
         * const action = itemView.addAction('dice', 'foo', () => {
         *     console.log('bar');
         * });
         * ```
         * @official
         */
        addAction(icon: IconName, title: string, callback: (evt: MouseEvent) => any): HTMLElement;

        /**
         * Create a new item view.
         *
         * @param leaf - The workspace leaf to create the item view in.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(leaf: WorkspaceLeaf): this;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        handleDrop(event: DragEvent, t: unknown, n: unknown): unknown;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onGroupChange(): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onMoreOptions(event: Event): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onMoreOptionsMenu(e: unknown): void;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        updateNavButtons(): void;
    }
}
