export { };

import type { WindowSelection } from "../types.d.ts";

declare module "obsidian" {
    interface Modal {
        /** @internal Background applied to application to dim it */
        bgEl: HTMLElement;
        /** @internal Opacity percentage of the background */
        bgOpacity: number;
        /** @internal Whether the background is being dimmed */
        dimBackground: boolean;
        /** @internal Modal container element */
        modalEl: HTMLElement;
        /** @internal Selection logic handler */
        selection: WindowSelection;
        /**
         * Reference to the global Window object
         */
        win: Window;

        /** @internal On escape key press close modal */
        onEscapeKey(): void;
        /** @internal On closing of the modal */
        onWindowClose(): void;
        /**
         * @param opacity Opacity percentage
         * @internal Set the background opacity of the dimmed background
         */
        setBackgroundOpacity(opacity: string): this;
        /**
         * @param content Content to set
         * @internal Set the content of the modal
         */
        setContent(content: DocumentFragment | string): this;
        /**
         * @param dim Whether the background should be dimmed
         * @internal Set whether the background should be dimmed
         */
        setDimBackground(dim: boolean): this;
        /**
         * @param title Title to set
         * @internal Set the title of the modal
         */
        setTitle(title: string): this;
    }
}
