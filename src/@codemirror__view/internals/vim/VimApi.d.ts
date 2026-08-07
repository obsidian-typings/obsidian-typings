import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimActionFn } from './VimActionFn.d.ts';
import type { VimBooleanOptionCallback } from './VimBooleanOptionCallback.d.ts';
import type { VimExFn } from './VimExFn.d.ts';
import type { VimGlobalState } from './VimGlobalState.d.ts';
import type { VimInsertModeKeyConstructor } from './VimInsertModeKeyConstructor.d.ts';
import type { VimKeyMapping } from './VimKeyMapping.d.ts';
import type { VimKeyMappingArgs } from './VimKeyMappingArgs.d.ts';
import type { VimKeyMappingBase } from './VimKeyMappingBase.d.ts';
import type { VimKeyMappingContext } from './VimKeyMappingContext.d.ts';
import type { VimKeyMappingType } from './VimKeyMappingType.d.ts';
import type { VimMotionFn } from './VimMotionFn.d.ts';
import type { VimNumberOptionCallback } from './VimNumberOptionCallback.d.ts';
import type { VimOperatorFn } from './VimOperatorFn.d.ts';
import type { VimOptionConfig } from './VimOptionConfig.d.ts';
import type { VimOptionValue } from './VimOptionValue.d.ts';
import type { VimRegister } from './VimRegister.d.ts';
import type { VimRegisterController } from './VimRegisterController.d.ts';
import type { VimStateVim } from './VimStateVim.d.ts';
import type { VimStringOptionCallback } from './VimStringOptionCallback.d.ts';

/**
 * Public API for interacting with the Vim emulation layer.
 *
 * Obsidian ships the CodeMirror 5 Vim mode ported onto CodeMirror 6. The port is
 * {@link https://github.com/nightwing/cm6-vim-mode-experiment | nightwing/cm6-vim-mode-experiment}
 * `103a9b5`, taken from
 * {@link https://github.com/codemirror/CodeMirror/commit/793c9e65e09ec7fba3f4f5aaf366b3d36e1a709e | codemirror/CodeMirror@793c9e6},
 * and its maintained successor is
 * {@link https://github.com/replit/codemirror-vim | replit/codemirror-vim}, whose
 * {@link https://github.com/replit/codemirror-vim/commit/0ac05aba9ef84efb236d8c686f8699ef4295b200 | 0ac05ab}
 * is what Obsidian's build was traced to. The behavior these members describe is documented in the
 * {@link https://codemirror.net/5/doc/manual.html#vimapi | CodeMirror 5 vim API manual}, but Obsidian's
 * copy has diverged from all of the above, so these types describe what Obsidian actually ships. Every
 * type in this folder is sourced that way and does not repeat these links.
 *
 * Two events are signalled on the editor: `vim-mode-change`, whose payload is a `VimModeChangeEvent`,
 * and `vim-command-done`, which fires once a command completes or no command matched and carries no
 * payload in Obsidian's build. The `vim-keypress` event the manual documents is **not** signalled here.
 *
 * @public
 * @unofficial
 */
export interface VimApi {
  /**
   * Records a keystroke made while insert mode was active, so the insertion can be replayed.
   */
  InsertModeKey: VimInsertModeKeyConstructor;

  /**
   * Whether errors thrown while handling a key are swallowed instead of being logged to the console.
   */
  suppressErrorLogging: boolean;

  /**
   * Add a key mapping to the front of the key map, where it takes precedence over the mappings already
   * there.
   *
   * @param command - The mapping to add.
   */
  _mapCommand(command: VimKeyMapping): void;

  /**
   * Rebuild the key map from the current configuration.
   *
   * @remarks Obsidian's build leaves this empty — the key map is matched directly rather than compiled.
   */
  buildKeyMap(): void;

  /**
   * Register an action, which is a command that does its own work rather than waiting for a motion to
   * give it a range. Actions may behave however they like, which makes them more flexible than motions
   * and operators at the cost of orthogonality.
   *
   * @param name - The name mappings refer to the action by.
   * @param fn - The implementation.
   */
  defineAction(name: string, fn: VimActionFn): void;

  /**
   * Register an Ex command, and map it to `:name`.
   *
   * @param name - The command's full name.
   * @param prefix - The shortest abbreviation that invokes it. The prefix itself, and any substring of
   * `name` that starts with it, will invoke the command. Falsy leaves `name` as the prefix.
   * @param func - The implementation.
   * @throws When `prefix` is not a prefix of `name`.
   */
  defineEx(name: string, prefix: string, func: VimExFn): void;

  /**
   * Register a motion, which moves the cursor without changing the document.
   *
   * @param name - The name mappings refer to the motion by.
   * @param fn - The implementation.
   */
  defineMotion(name: string, fn: VimMotionFn): void;

  /**
   * Register an operator, which transforms the range a motion selected.
   *
   * @param name - The name mappings refer to the operator by.
   * @param fn - The implementation.
   */
  defineOperator(name: string, fn: VimOperatorFn): void;

  /**
   * Register an option that `:set` can read and write.
   *
   * @param name - The option's name.
   * @param defaultValue - The value the option takes until it is set. Required unless a callback is
   * given.
   * @param type - The kind of value the option holds.
   * @param aliases - Other names the option answers to.
   * @param callback - Invoked to read and write the option, for options not backed by a stored value.
   * @throws When `defaultValue` is `undefined` and no callback is given.
   */
  defineOption(
    name: string,
    defaultValue: boolean | null | undefined,
    type: 'boolean',
    aliases?: null | string[],
    callback?: VimBooleanOptionCallback
  ): void;

  /**
   * Register an option that `:set` can read and write.
   *
   * @param name - The option's name.
   * @param defaultValue - The value the option takes until it is set. Required unless a callback is
   * given.
   * @param type - The kind of value the option holds.
   * @param aliases - Other names the option answers to.
   * @param callback - Invoked to read and write the option, for options not backed by a stored value.
   * @throws When `defaultValue` is `undefined` and no callback is given.
   */
  defineOption(
    name: string,
    defaultValue: null | number | undefined,
    type: 'number',
    aliases?: null | string[],
    callback?: VimNumberOptionCallback
  ): void;

  /**
   * Register an option that `:set` can read and write.
   *
   * @param name - The option's name.
   * @param defaultValue - The value the option takes until it is set. Required unless a callback is
   * given.
   * @param type - The kind of value the option holds. Defaults to `string`.
   * @param aliases - Other names the option answers to.
   * @param callback - Invoked to read and write the option, for options not backed by a stored value.
   * @throws When `defaultValue` is `undefined` and no callback is given.
   */
  defineOption(
    name: string,
    defaultValue: null | string | undefined,
    type?: 'string',
    aliases?: null | string[],
    callback?: VimStringOptionCallback
  ): void;

  /**
   * Register a named register, so yanks and pastes can address it.
   *
   * @param name - The register's one-character name, which is what refers to it.
   * @param register - The register implementation. It must support `setText`, `pushText`, `clear` and
   * `toString`.
   * @throws When the name is not one character, or a register of that name already exists.
   */
  defineRegister(name: string, register: VimRegister): void;

  /**
   * Enter insert mode.
   *
   * @param cm - The editor to act on.
   */
  enterInsertMode(cm: CodeMirrorEditor): void;

  /**
   * Turn Vim mode on for an editor, taking over its key handling and initializing its Vim state.
   *
   * @param cm - The editor to act on.
   */
  enterVimMode(cm: CodeMirrorEditor): void;

  /**
   * Leave insert mode, returning to normal mode.
   *
   * @param cm - The editor to act on.
   * @param keepCursor - Whether the cursor stays where it is rather than stepping back one character
   * the way Vim does.
   */
  exitInsertMode(cm: CodeMirrorEditor, keepCursor?: boolean): void;

  /**
   * Leave visual mode, returning to normal mode.
   *
   * @param cm - The editor to act on.
   * @param moveHead - Whether the cursor collapses onto the head of the selection. Pass `false` to
   * leave it where it is.
   */
  exitVisualMode(cm: CodeMirrorEditor, moveHead?: boolean): void;

  /**
   * Match a key against the key map, taking any keys already buffered into account.
   *
   * @param cm - The editor to act on.
   * @param key - The key that was pressed.
   * @param origin - Where the key came from. `mapping` marks a key produced by another mapping, which
   * keeps it out of a macro being recorded.
   * @returns A function that runs the matched command, a function that does nothing when the keys so
   * far are only a partial match, or `undefined` when nothing matched.
   */
  findKey(cm: CodeMirrorEditor, key: string, origin?: string): (() => boolean | undefined) | undefined;

  /**
   * Read a Vim option.
   *
   * @param name - The option's name.
   * @param cm - The editor to read the value from.
   * @param cfg - Which copy of the option to read.
   * @returns The option's value, or an `Error` when no option of that name is registered.
   * @remarks When `cfg.scope` is unset and an editor is given, the editor's own value is returned,
   * falling back to the global value when the editor has none. When `cfg.scope` is given, only that copy
   * is consulted and the other is not checked.
   */
  getOption(name: string, cm?: CodeMirrorEditor, cfg?: VimOptionConfig): Error | VimOptionValue;

  /**
   * Get the controller owning every register.
   *
   * @returns The register controller.
   */
  getRegisterController(): VimRegisterController;

  /**
   * Get the Vim state shared by every editor.
   *
   * @returns The global Vim state.
   */
  getVimGlobalState_(): VimGlobalState;

  /**
   * Run an Ex command.
   *
   * @param cm - The editor to act on.
   * @param input - The command line, as it would be typed after the `:`.
   */
  handleEx(cm: CodeMirrorEditor, input: string): void;

  /**
   * Match a key and run whatever command it resolves to.
   *
   * @param cm - The editor to act on.
   * @param key - The key that was pressed.
   * @param origin - Where the key came from.
   * @returns Whether the key was handled, or `undefined` when nothing matched.
   */
  handleKey(cm: CodeMirrorEditor, key: string, origin?: string): boolean | undefined;

  /**
   * Set the langmap, which translates the keys of a non-Latin keyboard layout into the keys the
   * mappings are written in.
   *
   * @param langmapString - The langmap, in the format `:set langmap` accepts.
   * @param remapCtrl - Whether the translation also applies to keys held with Control.
   */
  langmap(langmapString: string, remapCtrl?: boolean): void;

  /**
   * Turn Vim mode off for an editor, giving key handling back to it and discarding its Vim state.
   *
   * @param cm - The editor to act on.
   */
  leaveVimMode(cm: CodeMirrorEditor): void;

  /**
   * Map one key sequence to another, allowing the result to be remapped further. Implements Vim's
   * `:map` — mapping `;` to `:`, which in Vim is `:map ; :`, is `map(';', ':')` here.
   *
   * @param lhs - The key sequence to map.
   * @param rhs - What it is mapped to.
   * @param ctx - The mode the mapping applies in, corresponding to `:nmap`, `:vmap` and `:imap`.
   * Omitted applies it in every mode.
   */
  map(lhs: string, rhs: string, ctx?: VimKeyMappingContext): void;

  /**
   * Remove every user-defined mapping, leaving the built-in ones in place.
   *
   * @param ctx - The mode to clear. Omitted clears every mode.
   */
  mapclear(ctx?: VimKeyMappingContext): void;

  /**
   * Map a key sequence directly to a registered command, which is what `map` is built on.
   *
   * @param keys - The key sequence to map.
   * @param type - Which kind of command the keys run.
   * @param name - The name the command was registered under.
   * @param args - The arguments passed through to the command when the key sequence invokes it.
   * @param extra - Further fields to set on the mapping. `context` restricts it to one mode, and
   * `isEdit` — which applies to actions only — decides whether the command is recorded for replay by
   * the `.` single-repeat command.
   */
  mapCommand(
    keys: string,
    type: VimKeyMappingType,
    name: string,
    args?: VimKeyMappingArgs,
    extra?: Partial<VimKeyMappingBase>
  ): void;

  /**
   * Get an editor's Vim state, creating it if Vim mode has not touched this editor yet.
   *
   * @param cm - The editor to act on.
   * @returns The editor's Vim state.
   */
  maybeInitVimState_(cm: CodeMirrorEditor): VimStateVim;

  /**
   * Match a key and run it against every selection, for editors with more than one.
   *
   * @param cm - The editor to act on.
   * @param key - The key that was pressed.
   * @param origin - Where the key came from.
   * @returns Whether the key was handled, or `undefined` when nothing matched.
   */
  multiSelectHandleKey(cm: CodeMirrorEditor, key: string, origin?: string): boolean | undefined;

  /**
   * Map one key sequence to another without allowing the result to be remapped further.
   *
   * @param lhs - The key sequence to map.
   * @param rhs - What it is mapped to.
   * @param ctx - The mode the mapping applies in. Omitted applies it in every mode.
   * @remarks Only maps to key sequences the built-in key map already defines.
   */
  noremap(lhs: string, rhs: string, ctx?: VimKeyMappingContext): void;

  /**
   * Discard the Vim state shared by every editor and rebuild it, resetting every option to its default.
   *
   * @remarks The CodeMirror 5 manual says options previously set with `setOption` are re-applied to the
   * rebuilt state. Obsidian's build does not do that — it assigns each option its declared default, so
   * earlier `setOption` calls are discarded along with the rest of the state.
   */
  resetVimGlobalState_(): void;

  /**
   * Write a Vim option.
   *
   * @param name - The option's name.
   * @param value - The value to set. An option declared as a boolean takes `true` when this is omitted,
   * and anything other than `true` or `false` is rejected.
   * @param cm - The editor to write the value to.
   * @param cfg - Which copy of the option to write.
   * @returns An `Error` when no option of that name is registered or the value does not suit its type,
   * otherwise nothing.
   * @remarks When `cfg.scope` is unset and an editor is given, **both** the global value and that
   * editor's own value are set. When `cfg.scope` is given, only that copy is written.
   */
  setOption(name: string, value: VimOptionValue, cm?: CodeMirrorEditor, cfg?: VimOptionConfig): Error | undefined;

  /**
   * Remove a user-defined mapping.
   *
   * @param lhs - The key sequence the mapping was made for.
   * @param ctx - The mode the mapping was made in.
   * @returns `true` when a mapping was removed, otherwise `undefined`.
   * @throws When a mode is given for an Ex mapping, which cannot have one.
   */
  unmap(lhs: string, ctx?: VimKeyMappingContext): true | undefined;

  /**
   * Translate a keyboard event into the Vim-style key name the mappings are written in.
   *
   * @param e - The keyboard event.
   * @param vim - The editor's Vim state, consulted for whether the next key is taken literally.
   * @returns The key name, or `undefined` for a key Vim ignores.
   */
  vimKeyFromEvent(e: KeyboardEvent, vim?: VimStateVim): string | undefined;
}
