import type { Scope } from "obsidian";

/** @todo Documentation incomplete */
export interface KeyScope {
    /**
     * Key to match
     */
    key: string | null;
    /**
     * Modifiers to match
     */
    modifiers: string | null;
    /**
     * Scope where the key interceptor is registered
     */
    scope: Scope;

    /**
     * Callback of function to execute when key is pressed
     */
    func(): void;
}
