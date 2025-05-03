import type {
    App,
    Debouncer,
    KeymapInfo
} from 'obsidian';
import type { HotkeyManagerCustomKeysRecord } from './HotkeyManagerCustomKeysRecord.d.ts';
import type { HotkeyManagerDefaultKeysRecord } from './HotkeyManagerDefaultKeysRecord.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface HotkeyManager {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Whether hotkeys have been baked (checks completed).
     */
    baked: boolean;

    /**
     * Assigned hotkeys.
     */
    bakedHotkeys: KeymapInfo[];

    /**
     * Array of hotkey index to command ID.
     */
    bakedIds: string[];

    /**
     * Custom (non-Obsidian default) hotkeys, one to many mapping of command ID to assigned hotkey.
     */
    customKeys: HotkeyManagerCustomKeysRecord;

    /**
     * Default hotkeys, one to many mapping of command ID to assigned hotkey.
     */
    defaultKeys: HotkeyManagerDefaultKeysRecord;

    /** @todo Documentation incomplete. */
    onConfigFileChange: Debouncer<[], Promise<void>>;

    /**
     * Add a hotkey to the default hotkeys.
     *
     * @param command - Command ID to add hotkey to.
     * @param keys - Hotkeys to add.
     */
    addDefaultHotkeys(command: string, keys: KeymapInfo[]): void;

    /**
     * Bake hotkeys (create mapping of pressed key to command ID).
     */
    bake(): void;

    /**
     * Get hotkey associated with command ID.
     *
     * @param command - Command ID to get hotkey for.
     */
    getDefaultHotkeys(command: string): KeymapInfo[];

    /**
     * Get hotkey associated with command ID.
     *
     * @param command - Command ID to get hotkey for.
     */
    getHotkeys(command: string): KeymapInfo[];

    /**
     * Load hotkeys from storage.
     */
    load(): void;

    /** @todo Documentation incomplete. */
    onRaw(e: unknown): void;

    /**
     * Trigger a command by keyboard event.
     *
     * @param event - Keyboard event to trigger command with.
     * @param keypress - Pressed key information.
     */
    onTrigger(event: KeyboardEvent, keypress: KeymapInfo): boolean;

    /**
     * Pretty-print hotkey of a command.
     *
     * @param commandId - Command ID to print hotkey for.
     */
    printHotkeyForCommand(commandId: string): string;

    /** @todo Documentation incomplete. */
    registerListeners(): void;

    /**
     * Remove a hotkey from the default hotkeys.
     *
     * @param command - Command ID to remove hotkey from.
     */
    removeDefaultHotkeys(command: string): void;

    /**
     * Remove a hotkey from the custom hotkeys.
     *
     * @param command - Command ID to remove hotkey from.
     */
    removeHotkeys(command: string): void;

    /**
     * Save custom hotkeys to storage.
     */
    save(): void;

    /**
     * Add a hotkey to the custom hotkeys (overrides default hotkeys).
     *
     * @param command - Command ID to add hotkey to.
     * @param keys - Hotkeys to add.
     */
    setHotkeys(command: string, keys: KeymapInfo[]): void;
}
