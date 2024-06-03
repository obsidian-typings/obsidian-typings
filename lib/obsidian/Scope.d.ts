import type {
    KeymapEventHandler,
    KeymapEventListener,
    KeymapInfo,
    Modifier
} from "obsidian";
import type { KeyScope } from "./internals/index.d.ts";

export default interface Scope {
    /** @internal - Callback to execute when scope is matched */
    cb: (() => boolean) | undefined;
    /**
     * Overridden keys that exist in this scope
     */
    keys: KeyScope[];
    /** @internal Scope that this scope is a child of */
    parent: Scope | undefined;
    /** @internal */
    tabFocusContainer: HTMLElement | null;

    /**
     * @param event - Keyboard event
     * @param keypress - Pressed key information
     * @internal Execute keypress within this scope
     */
    handleKey(event: KeyboardEvent, keypress: KeymapInfo): unknown;
    /**
     * @deprecated - Executes same functionality as `Scope.register`
     * @internal
     */
    registerKey(modifiers: Modifier[], key: string | null, func: KeymapEventListener): KeymapEventHandler;
    /** @internal */
    setTabFocusContainer(container: HTMLElement): void;
}
