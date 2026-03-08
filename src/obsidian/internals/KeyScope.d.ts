import type { Scope } from 'obsidian';

/**
 * A registered keyboard shortcut interceptor within a scope.
 * @public
 * @unofficial
 */
export interface KeyScope {
    /**
     * Callback of function to execute when key is pressed.
     */
    func(): void;

    /**
     * Key to match.
     */
    key: string | null;

    /**
     * Modifiers to match.
     */
    modifiers: string | null;

    /**
     * Scope where the key interceptor is registered.
     */
    scope: Scope;
}
