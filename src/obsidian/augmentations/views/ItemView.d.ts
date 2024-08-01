export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface ItemView extends View {
        /**
         * Container of actions for the view
         */
        actionsEl: HTMLElement;
        /**
         * Back button element for changing view history
         */
        backButtonEl: HTMLButtonElement;
        /**
         * Whether the view may be dropped anywhere in workspace
         */
        canDropAnywhere: boolean;
        /**
         * Forward button element for changing view history
         */
        forwardButtonEl: HTMLButtonElement;
        /**
         * Header bar container of view
         */
        headerEl: HTMLElement;
        /**
         * Icon element for the view (for dragging)
         */
        iconEl: HTMLElement;
        /**
         * Anchor button for revealing more view actions
         */
        moreOptionsButtonEl: HTMLAnchorElement;
        /**
         * Container for the title of the view
         */
        titleContainerEl: HTMLElement;
        /**
         * Title element for the view
         */
        titleEl: HTMLElement;
        /**
         * Title of the parent
         *
         * @remark Used for breadcrumbs rendering
         */
        titleParentEl: HTMLElement;

        /** @internal */
        handleDrop(e: unknown, t: unknown, n: unknown): unknown;
        /** @internal */
        onGroupChange(): void;
        /** @internal */
        onMoreOptions(e: unknown): void;
        /** @deprecated use onPaneMenu instead */
        onMoreOptionsMenu(e: unknown): void;
        /** @internal */
        updateNavButtons(): void;
    }
}
