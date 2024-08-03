export { };

declare module "obsidian" {
	/** @todo Documentation incomplete */
	interface FileView extends ItemView {
		/**
		 * Whether the view may be run without an attached file
		 */
		allowNoFile: boolean;

		/**
		 * Get view state for sync plugin
		 */
		getSyncViewState(): any;
		/** @internal */
		loadFile(e: unknown): unknown;
		/** @internal */
		renderBreadcrumbs(): void;
		/** @internal */
		syncState(e: unknown): unknown;
		/** @internal */
		onLoadFile(file: TFile): Promise<void>;
		/** @internal */
		onUnloadFile(file: TFile): Promise<void>;
		/** @internal */
		onRename(file: TFile): Promise<void>;
		/** @internal */
		onDelete(file: TFile): Promise<void>;
		/** @internal */
		canAcceptExtension(extension: string): boolean;
	}
}
