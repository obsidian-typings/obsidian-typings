export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
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
         *
         * @unofficial
         */
        addAction(icon: IconName, title: string, callback: (evt: MouseEvent) => any): HTMLElement;
        /**
         * @unofficial
         */
        handleDrop(event: DragEvent, t: unknown, n: unknown): unknown;
        /**
         * @unofficial
         */
        onGroupChange(): void;
        /**
         * @unofficial
         */
        onMoreOptions(event: Event): void;
        /**
         * @unofficial
         */
        onMoreOptionsMenu(e: unknown): void;
        /**
         * @unofficial
         */
        updateNavButtons(): void;
    }
}
