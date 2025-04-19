export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface ItemView extends View {
        /**
         * Container of actions for the view.
         */
        actionsEl: HTMLElement;
        /**
         * Back button element for changing view history.
         */
        backButtonEl: HTMLButtonElement;
        /**
         * Whether the view may be dropped anywhere in workspace.
         */
        canDropAnywhere: boolean;
        /**
         * Forward button element for changing view history.
         */
        forwardButtonEl: HTMLButtonElement;
        /**
         * Header bar container of view.
         */
        headerEl: HTMLElement;
        /**
         * Icon element for the view (for dragging).
         */
        iconEl: HTMLElement;
        /**
         * Anchor button for revealing more view actions.
         */
        moreOptionsButtonEl: HTMLAnchorElement;
        /**
         * Container for the title of the view.
         */
        titleContainerEl: HTMLElement;
        /**
         * Title element for the view.
         */
        titleEl: HTMLElement;
        /**
         * Title of the parent.
         *
         * @remark Used for breadcrumbs rendering.
         */
        titleParentEl: HTMLElement;

        /**
         * Adds an action button to the header of the view.
         * @param icon - The icon for the action.
         * @param title - The title for the action.
         * @param callback - Callback to execute on click.
         */
        addAction(icon: IconName, title: string, callback: (evt: MouseEvent) => any): HTMLElement;
        /** @todo Documentation incomplete */
        handleDrop(event: DragEvent, t: unknown, n: unknown): unknown;
        /** @todo Documentation incomplete */
        onGroupChange(): void;
        /** @todo Documentation incomplete */
        onMoreOptions(event: Event): void;
        /** @deprecated use onPaneMenu instead */
        onMoreOptionsMenu(e: unknown): void;
        /**
         * Updates the navigation buttons depending on the history.
         */
        updateNavButtons(): void;
    }
}
