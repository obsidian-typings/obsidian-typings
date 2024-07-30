import type { App } from "obsidian";
export interface EmbedContext {
    /**
     * Reference to the app
     */
    app: App;
    /**
     * Element where the embed should be displayed
     */
    containerEl: HTMLElement;
    /**
     * Depth of the embed within its container (how many levels of embeds are above it)
     */
    depth?: number;
    /**
     * Whether the embed should be dynamic (CM) or static (postProcessed)
     */
    displayMode?: boolean;
    /**
     * Text that should be displayed in the embed
     */
    linktext?: string;
    /**
     * Whether the embed should be an inline embed
     */
    showInline?: boolean;
    /**
     * Optional path to the current open file
     */
    sourcePath?: string;
    /** @internal */
    state?: unknown;
}
