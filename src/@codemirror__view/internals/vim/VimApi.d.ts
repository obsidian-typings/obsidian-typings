import type { VimEditor } from './VimEditor.d.ts';
import type { VimState } from './VimState.d.ts';

/**
 * Public API for interacting with the Vim emulation layer.
 *
 * @public
 * @unofficial
 */
export interface VimApi {
  /** Whether to suppress error logging from the Vim layer. */
  suppressErrorLogging: boolean;

  /**
   * Register an internal key mapping command.
   *
   * @param command - The command to register.
   * @returns The registered command result.
   */
  _mapCommand(command: unknown): unknown;

  /** Build the key map from the current configuration. */
  buildKeyMap(): void;

  /**
   * Define a new Vim action with the given name and handler function.
   *
   * @param name - The name of the action.
   * @param fn - The handler function for the action.
   */
  defineAction(name: string, fn: (cm: VimEditor, actionArgs: unknown, vim: VimState['vim']) => void): void;

  /**
   * Define a new Ex command with the given name and prefix.
   *
   * @param name - The name of the Ex command.
   * @param prefix - The prefix for the Ex command.
   * @param func - The function to execute for the Ex command.
   * @returns The defined Ex command result.
   */
  defineEx(name: unknown, prefix: unknown, func: unknown): unknown;

  /**
   * Define a new Vim motion with the given name and handler.
   *
   * @param name - The name of the motion.
   * @param fn - The handler function for the motion.
   * @returns The defined motion result.
   */
  defineMotion(name: unknown, fn: unknown): unknown;

  /**
   * Define a new Vim operator with the given name and handler.
   *
   * @param name - The name of the operator.
   * @param fn - The handler function for the operator.
   * @returns The defined operator result.
   */
  defineOperator(name: unknown, fn: unknown): unknown;

  /**
   * Define a new Vim option with default value, type, aliases, and change callback.
   *
   * @param name - The name of the option.
   * @param defaultValue - The default value for the option.
   * @param type - The type of the option.
   * @param aliases - The aliases for the option.
   * @param callback - The callback invoked when the option changes.
   * @returns The defined option result.
   */
  defineOption(name: unknown, defaultValue: unknown, type: unknown, aliases: unknown, callback: unknown): unknown;

  /**
   * Define a new named register.
   *
   * @param name - The name of the register.
   * @param register - The register object.
   * @returns The defined register result.
   */
  defineRegister(name: unknown, register: unknown): unknown;

  /**
   * Enter insert mode in the given editor.
   *
   * @param cm - The editor instance.
   * @returns The result of entering insert mode.
   */
  enterInsertMode(cm: unknown): unknown;

  /**
   * Enter Vim mode in the given editor.
   *
   * @param cm - The editor instance.
   * @returns The result of entering Vim mode.
   */
  enterVimMode(cm: unknown): unknown;

  /**
   * Exit insert mode, optionally keeping the cursor position.
   *
   * @param cm - The editor instance.
   * @param keepCursor - Whether to keep the cursor position.
   * @returns The result of exiting insert mode.
   */
  exitInsertMode(cm: unknown, keepCursor: unknown): unknown;

  /**
   * Exit visual mode, optionally moving the head of the selection.
   *
   * @param cm - The editor instance.
   * @param moveHead - Whether to move the head of the selection.
   * @returns The result of exiting visual mode.
   */
  exitVisualMode(cm: unknown, moveHead: unknown): unknown;

  /**
   * Look up a key binding in the given editor and origin context.
   *
   * @param cm - The editor instance.
   * @param key - The key to look up.
   * @param origin - The origin context for the lookup.
   * @returns The found key binding result.
   */
  findKey(cm: unknown, key: unknown, origin: unknown): unknown;

  /**
   * Get the value of a Vim option.
   *
   * @param name - The name of the option.
   * @param cm - The editor instance.
   * @param cfg - The configuration object.
   * @returns The option value.
   */
  getOption(name: unknown, cm: unknown, cfg: unknown): unknown;

  /**
   * Get the register controller managing all registers.
   *
   * @returns The register controller.
   */
  getRegisterController(): unknown;

  /**
   * Get the global Vim state object.
   *
   * @returns The global Vim state.
   */
  getVimGlobalState_(): unknown;

  /**
   * Handle an Ex command input string.
   *
   * @param cm - The editor instance.
   * @param input - The Ex command input string.
   * @returns The result of handling the Ex command.
   */
  handleEx(cm: unknown, input: unknown): unknown;

  /**
   * Handle a key press in the given editor with the specified origin.
   *
   * @param cm - The editor instance.
   * @param key - The key that was pressed.
   * @param origin - The origin of the key press.
   * @returns The result of handling the key.
   */
  handleKey(cm: unknown, key: unknown, origin: unknown): unknown;

  /**
   * Create an insert mode key binding for the given key name.
   *
   * @param keyName - The key name to bind.
   */
  InsertModeKey(keyName: string): void;

  /**
   * Leave Vim mode in the given editor.
   *
   * @param cm - The editor instance.
   * @returns The result of leaving Vim mode.
   */
  leaveVimMode(cm: unknown): unknown;

  /**
   * Create a recursive key mapping from lhs to rhs in the given context.
   *
   * @param lhs - The left-hand side key sequence.
   * @param rhs - The right-hand side key sequence or command.
   * @param ctx - The mapping context.
   * @returns The mapping result.
   */
  map(lhs: unknown, rhs: unknown, ctx: unknown): unknown;

  /**
   * Clear all key mappings in the given context.
   *
   * @param ctx - The mapping context to clear.
   * @returns The result of clearing the mappings.
   */
  mapclear(ctx: unknown): unknown;

  /**
   * Map a key sequence to a command type, name, args, and extra options.
   *
   * @param keys - The key sequence to map.
   * @param type - The command type.
   * @param name - The command name.
   * @param args - The command arguments.
   * @param extra - The extra options.
   * @returns The mapping result.
   */
  mapCommand(keys: unknown, type: unknown, name: unknown, args: unknown, extra: unknown): unknown;

  /**
   * Initialize the Vim state for the given editor if not already initialized.
   *
   * @param cm - The editor instance.
   * @returns The Vim state.
   */
  maybeInitVimState_(cm: unknown): unknown;

  /**
   * Handle a key press in multi-select mode.
   *
   * @param cm - The editor instance.
   * @param key - The key that was pressed.
   * @param origin - The origin of the key press.
   * @returns The result of handling the key.
   */
  multiSelectHandleKey(cm: unknown, key: unknown, origin: unknown): unknown;

  /**
   * Create a non-recursive key mapping from lhs to rhs in the given context.
   *
   * @param lhs - The left-hand side key sequence.
   * @param rhs - The right-hand side key sequence or command.
   * @param ctx - The mapping context.
   * @returns The mapping result.
   */
  noremap(lhs: unknown, rhs: unknown, ctx: unknown): unknown;

  /**
   * Reset the global Vim state to defaults.
   *
   * @returns The result of resetting the state.
   */
  resetVimGlobalState_(): unknown;

  /**
   * Set the value of a Vim option.
   *
   * @param name - The name of the option.
   * @param value - The value to set.
   * @param cm - The editor instance.
   * @param cfg - The configuration object.
   * @returns The result of setting the option.
   */
  setOption(name: unknown, value: unknown, cm: unknown, cfg: unknown): unknown;

  /**
   * Remove a key mapping for lhs in the given context.
   *
   * @param lhs - The left-hand side key sequence to unmap.
   * @param ctx - The mapping context.
   * @returns The result of removing the mapping.
   */
  unmap(lhs: unknown, ctx: unknown): unknown;
}
