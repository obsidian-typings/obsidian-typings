import type { ViewEphemeralState } from '../../internals/ViewEphemeralState.d.ts';

export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface View extends Component {
        app: App;
        /**
         * Whether the leaf may close the view
         */
        closeable: boolean;
        containerEl: HTMLElement;
        /**
         * The icon string
         */
        icon: IconName;
        leaf: WorkspaceLeaf;

        /**
         * Closes the view
         */
        close(): Promise<void>;
        /**
         * Returns the icon name
         */
        getIcon(): IconName;
        /**
         * Returns the placement of the tooltip
         */
        getSideTooltipPlacement(): 'left' | 'right' | undefined;
        /**
         * Handle copy event on metadata editor and serialize properties
         */
        handleCopy(event: ClipboardEvent): void;
        /**
         * Handle cut event on metadata editor and serialize and remove properties
         */
        handleCut(event: ClipboardEvent): void;
        /**
         * Handle paste event of properties on metadata editor
         */
        handlePaste(event: ClipboardEvent): void;
        /** @deprecated use `onPaneMenu` instead */
        onHeaderMenu(e: unknown): void;
        /**
         * Adds the menu items to the menu
         * @param menu the menu to fill
         */
        onTabMenu(menu: Menu): void;
        /**
         * Opens the view
         * @param parentEl The node the view get attached to
         */
        open(parentEl: Node): Promise<void>;
        /**
         * Set the ephemeral (non-persistent) state of the editor
         */
        setEphemeralState(state: ViewEphemeralState): void;
    }
}
