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
        /** @internal */
        onTabMenu(e: unknown): void;
        /** @internal */
        open(e: unknown): unknown;
		/**
         * Gets the ephemeral (non-persistent) state of the editor
         */
        getEphemeralState(): {};
		/**
         * Set the ephemeral (non-persistent) state of the editor
         */
        setEphemeralState(
            state: any & {
                focus: boolean;
                focusOnMobile: boolean;
                cursor: EditorRangeOrCaret;
            }
        ): void;
		/** @internal */
		//@ts-expect-error
		onOpen(): Promise<void>;
		/** @internal */
		//@ts-expect-error
		onClose(): Promise<void>;
		/** @internal */
		getState(): {};
		/** @internal */
		setState(state: any, result: ViewStateResult): Promise<void>;
		/** @internal */
		getIcon(): IconName;
		/** @internal */
		//@ts-expect-error
		getDisplayText(): string;
    }
}
