import type { ViewEphemeralState } from '../../internals/ViewEphemeralState.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface View extends Component {
        /**
         * @unofficial
         */
        app: App;
        /**
         * Whether the leaf may close the view.
         *
         * @unofficial
         */
        closeable: boolean;
        /**
         * @unofficial
         */
        containerEl: HTMLElement;
        /**
         * The icon string.
         *
         * @unofficial
         */
        icon: IconName;
        /**
         * @unofficial
         */
        leaf: WorkspaceLeaf;

        /**
         * Closes the view.
         *
         * @unofficial
         */
        close(): Promise<void>;
        /**
         * Returns the icon name.
         *
         * @unofficial
         */
        getIcon(): IconName;
        /**
         * Returns the placement of the tooltip.
         *
         * @unofficial
         */
        getSideTooltipPlacement(): 'left' | 'right' | undefined;
        /**
         * Handle copy event on metadata editor and serialize properties.
         *
         * @unofficial
         */
        handleCopy(event: ClipboardEvent): void;
        /**
         * Handle cut event on metadata editor and serialize and remove properties.
         *
         * @unofficial
         */
        handleCut(event: ClipboardEvent): void;
        /**
         * Handle paste event of properties on metadata editor.
         *
         * @unofficial
         */
        handlePaste(event: ClipboardEvent): void;
        /**
         * @deprecated use `onPaneMenu` instead
         *
         * @unofficial
         */
        onHeaderMenu(e: unknown): void;
        /**
         * Adds the menu items to the menu.
         *
         * @param menu the menu to fill.
         *
         * @unofficial
         */
        onTabMenu(menu: Menu): void;
        /**
         * Opens the view.
         *
         * @param parentEl The node the view get attached to.
         *
         * @unofficial
         */
        open(parentEl: Node): Promise<void>;
        /**
         * Set the ephemeral (non-persistent) state of the editor.
         *
         * @unofficial
         */
        setEphemeralState(state: ViewEphemeralState): void;
    }
}
