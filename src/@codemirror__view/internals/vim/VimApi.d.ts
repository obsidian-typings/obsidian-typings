import type { VimEditor } from './VimEditor.d.ts';
import type { VimState } from './VimState.d.ts';

/**
 * Public API for interacting with the Vim emulation layer.
 *
 * @public
 * @unofficial
 */
export interface VimApi {
  /**
   * Whether to suppress error logging from the Vim layer.
   */
  suppressErrorLogging: boolean;

  /**
   * Register an internal key mapping command.
   *
   * @param command - The command to register.
   */
  _mapCommand(command: object): void;

  /**
   * Build the key map from the current configuration.
   */
  buildKeyMap(): void;

  /**
   * Define a new Vim action with the given name and handler function.
   *
   * @param name - The name of the action.
   * @param fn - The handler function for the action.
   */
  defineAction(name: string, fn: (cm: VimEditor, actionArgs: object, vim: VimState['vim']) => void): void;

  /**
   * Define a new Ex command with the given name and prefix.
   *
   * @param name - The name of the Ex command.
   * @param prefix - The prefix for the Ex command.
   * @param func - The function to execute for the Ex command.
   */
  defineEx(name: string, prefix: string, func: (cm: VimEditor, params: object) => void): void;

  /**
   * Define a new Vim motion with the given name and handler.
   *
   * @param name - The name of the motion.
   * @param fn - The handler function for the motion.
   */
  defineMotion(name: string, fn: (cm: VimEditor, head: object, motionArgs: object, vim: VimState['vim']) => object): void;

  /**
   * Define a new Vim operator with the given name and handler.
   *
   * @param name - The name of the operator.
   * @param fn - The handler function for the operator.
   */
  defineOperator(name: string, fn: (cm: VimEditor, operatorArgs: object, ranges: object[], oldAnchor: object, newHead: object) => void): void;

  /**
   * Define a new Vim option with default value, type, aliases, and change callback.
   *
   * @param name - The name of the option.
   * @param defaultValue - The default value for the option.
   * @param type - The type of the option.
   * @param aliases - The aliases for the option.
   * @param callback - The callback invoked when the option changes.
   */
  defineOption(name: string, defaultValue: unknown, type: string, aliases?: string[], callback?: (value: unknown, cm?: VimEditor) => void): void;

  /**
   * Define a new named register.
   *
   * @param name - The name of the register.
   * @param register - The register object.
   */
  defineRegister(name: string, register: object): void;

  /**
   * Enter insert mode in the given editor.
   *
   * @param cm - The editor instance.
   */
  enterInsertMode(cm: VimEditor): void;

  /**
   * Enter Vim mode in the given editor.
   *
   * @param cm - The editor instance.
   */
  enterVimMode(cm: VimEditor): void;

  /**
   * Exit insert mode, optionally keeping the cursor position.
   *
   * @param cm - The editor instance.
   * @param keepCursor - Whether to keep the cursor position.
   */
  exitInsertMode(cm: VimEditor, keepCursor?: boolean): void;

  /**
   * Exit visual mode, optionally moving the head of the selection.
   *
   * @param cm - The editor instance.
   * @param moveHead - Whether to move the head of the selection.
   */
  exitVisualMode(cm: VimEditor, moveHead?: boolean): void;

  /**
   * Look up a key binding in the given editor and origin context.
   *
   * @param cm - The editor instance.
   * @param key - The key to look up.
   * @param origin - The origin context for the lookup.
   * @returns Whether a binding was found and handled.
   */
  findKey(cm: VimEditor, key: string, origin?: string): boolean;

  /**
   * Get the value of a Vim option.
   *
   * @param name - The name of the option.
   * @param cm - The editor instance.
   * @param cfg - The configuration object.
   * @returns The option value.
   */
  getOption(name: string, cm?: VimEditor, cfg?: object): unknown;

  /**
   * Get the register controller managing all registers.
   *
   * @returns The register controller.
   */
  getRegisterController(): object;

  /**
   * Get the global Vim state object.
   *
   * @returns The global Vim state.
   */
  getVimGlobalState_(): object;

  /**
   * Handle an Ex command input string.
   *
   * @param cm - The editor instance.
   * @param input - The Ex command input string.
   */
  handleEx(cm: VimEditor, input: string): void;

  /**
   * Handle a key press in the given editor with the specified origin.
   *
   * @param cm - The editor instance.
   * @param key - The key that was pressed.
   * @param origin - The origin of the key press.
   * @returns Whether the key was handled.
   */
  handleKey(cm: VimEditor, key: string, origin?: string): boolean;

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
   */
  leaveVimMode(cm: VimEditor): void;

  /**
   * Create a recursive key mapping from lhs to rhs in the given context.
   *
   * @param lhs - The left-hand side key sequence.
   * @param rhs - The right-hand side key sequence or command.
   * @param ctx - The mapping context.
   */
  map(lhs: string, rhs: string, ctx?: string): void;

  /**
   * Clear all key mappings in the given context.
   *
   * @param ctx - The mapping context to clear.
   */
  mapclear(ctx?: string): void;

  /**
   * Map a key sequence to a command type, name, args, and extra options.
   *
   * @param keys - The key sequence to map.
   * @param type - The command type.
   * @param name - The command name.
   * @param args - The command arguments.
   * @param extra - The extra options.
   */
  mapCommand(keys: string, type: string, name: string, args?: object, extra?: object): void;

  /**
   * Initialize the Vim state for the given editor if not already initialized.
   *
   * @param cm - The editor instance.
   * @returns The Vim state.
   */
  maybeInitVimState_(cm: VimEditor): VimState;

  /**
   * Handle a key press in multi-select mode.
   *
   * @param cm - The editor instance.
   * @param key - The key that was pressed.
   * @param origin - The origin of the key press.
   * @returns Whether the key was handled.
   */
  multiSelectHandleKey(cm: VimEditor, key: string, origin?: string): boolean;

  /**
   * Create a non-recursive key mapping from lhs to rhs in the given context.
   *
   * @param lhs - The left-hand side key sequence.
   * @param rhs - The right-hand side key sequence or command.
   * @param ctx - The mapping context.
   */
  noremap(lhs: string, rhs: string, ctx?: string): void;

  /**
   * Reset the global Vim state to defaults.
   */
  resetVimGlobalState_(): void;

  /**
   * Set the value of a Vim option.
   *
   * @param name - The name of the option.
   * @param value - The value to set.
   * @param cm - The editor instance.
   * @param cfg - The configuration object.
   */
  setOption(name: string, value: unknown, cm?: VimEditor, cfg?: object): void;

  /**
   * Remove a key mapping for lhs in the given context.
   *
   * @param lhs - The left-hand side key sequence to unmap.
   * @param ctx - The mapping context.
   */
  unmap(lhs: string, ctx?: string): void;
}
