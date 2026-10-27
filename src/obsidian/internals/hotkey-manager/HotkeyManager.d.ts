import type {
  App,
  Debouncer,
  Hotkey,
  KeymapInfo
} from 'obsidian';

import type { getHotkeyManagerConstructor } from '../../implementations/constructors/internals/getHotkeyManagerConstructor.d.ts';
import type { HotkeyManagerCustomKeysRecord } from './HotkeyManagerCustomKeysRecord.d.ts';
import type { HotkeyManagerDefaultKeysRecord } from './HotkeyManagerDefaultKeysRecord.d.ts';

/**
 * Manager for keyboard shortcut registration, storage, and triggering.
 *
 * @public
 * @unofficial
 */
export interface HotkeyManager {
  /**
   * Reference to the {@link obsidian#App}.
   */
  app: App;

  /**
   * Whether hotkeys have been baked (checks completed).
   */
  baked: boolean;

  /**
   * Assigned hotkeys, compiled by {@link HotkeyManager.bake} from the custom hotkeys and then the default hotkeys of
   * every command without custom ones. Unlike the {@link obsidian#Hotkey} entries they are compiled from, their
   * `modifiers` is a single string.
   */
  bakedHotkeys: KeymapInfo[];

  /**
   * Array of hotkey index to command ID.
   */
  bakedIds: string[];

  /**
   * Custom (non-Obsidian default) hotkeys, one to many mapping of command ID to assigned hotkey.
   *
   * A getter returning a shallow copy of the stored record, so a key written on it is not persisted. Use
   * {@link HotkeyManager.setHotkeys} and {@link HotkeyManager.removeHotkeys} instead.
   */
  readonly customKeys: HotkeyManagerCustomKeysRecord;

  /**
   * Default hotkeys, one to many mapping of command ID to assigned hotkey.
   */
  defaultKeys: HotkeyManagerDefaultKeysRecord;

  /**
   * Debounced handler for hotkey config file changes on disk.
   */
  onConfigFileChange: Debouncer<[], Promise<void>>;

  /**
   * Add a hotkey to the default hotkeys.
   *
   * @param command - {@link obsidian#Command} ID to add hotkey to.
   * @param keys - Hotkeys to add.
   */
  addDefaultHotkeys(command: string, keys: Hotkey[]): void;

  /**
   * Bake hotkeys (create mapping of pressed key to command ID).
   */
  bake(): void;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getHotkeyManagerConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(app: App): this;

  /**
   * Get hotkey associated with command ID.
   *
   * @param command - {@link obsidian#Command} ID to get hotkey for.
   * @returns The default hotkeys for the command, or `undefined` if it has none.
   */
  getDefaultHotkeys(command: string): Hotkey[] | undefined;

  /**
   * Get hotkey associated with command ID.
   *
   * @param command - {@link obsidian#Command} ID to get hotkey for.
   * @returns The custom hotkeys for the command, or `undefined` if it has none.
   */
  getHotkeys(command: string): Hotkey[] | undefined;

  /**
   * Load hotkeys from storage.
   */
  load(): void;

  /**
   * Handle raw file system change events for the hotkey config.
   *
   * @param e - The file system change event.
   */
  onRaw(e: unknown): void;

  /**
   * Trigger a command by keyboard event.
   *
   * @param $event - Keyboard event to trigger command with.
   * @param keypress - Pressed key information.
   * @returns Whether a command was triggered.
   */
  onTrigger($event: KeyboardEvent, keypress: KeymapInfo): boolean;

  /**
   * Pretty-print hotkey of a command.
   *
   * @param commandId - {@link obsidian#Command} ID to print hotkey for.
   * @returns The formatted hotkey string.
   */
  printHotkeyForCommand(commandId: string): string;

  /**
   * Register event listeners for hotkey config file changes.
   */
  registerListeners(): void;

  /**
   * Remove a hotkey from the default hotkeys.
   *
   * @param command - {@link obsidian#Command} ID to remove hotkey from.
   */
  removeDefaultHotkeys(command: string): void;

  /**
   * Remove a hotkey from the custom hotkeys.
   *
   * @param command - {@link obsidian#Command} ID to remove hotkey from.
   */
  removeHotkeys(command: string): void;

  /**
   * Save custom hotkeys to storage.
   */
  save(): void;

  /**
   * Add a hotkey to the custom hotkeys (overrides default hotkeys).
   *
   * @param command - {@link obsidian#Command} ID to add hotkey to.
   * @param keys - Hotkeys to add.
   */
  setHotkeys(command: string, keys: Hotkey[]): void;
}
