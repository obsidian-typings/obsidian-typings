export {};

declare module "obsidian" {
    /** @todo Documentation incomplete */
    interface View extends Component {
        /**
         * Whether the leaf may close the view
         */
        closeable: boolean;

        /** @internal */
        close(): unknown;
        /** @internal */
        getSideTooltipPlacement(): string | undefined;
        /** @internal */
        handleCopy(e: unknown): void;
        /** @internal */
        handleCut(e: unknown): void;
        /** @internal */
        handlePaste(e: unknown): void;
        /** @deprecated use `onPaneMenu` instead */
        onHeaderMenu(e: unknown): void;
        /** @internal */
        onTabMenu(e: unknown): void;
        /** @internal */
        open(e: unknown): unknown;
    }
}
