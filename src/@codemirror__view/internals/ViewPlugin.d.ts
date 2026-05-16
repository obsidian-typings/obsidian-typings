import type { Extension } from '../../@codemirror__state/internals/Extension.d.ts';
import type { EditorView } from './EditorView.d.ts';
import type { PluginSpec } from './PluginSpec.d.ts';
import type { PluginValue } from './PluginValue.d.ts';

/**
 * A view plugin associates a value with an editor view.
 *
 * @public
 * @unofficial
 */
export declare class ViewPlugin<V extends PluginValue, Arg = undefined> {
  /** The extension created by this plugin, or `null` if an argument is required. */
  extension: Arg extends undefined ? Extension : null;

  /**
   * Define a new view plugin from a factory function.
   *
   * @param create - A function that creates the plugin value.
   * @param spec - Optional plugin specification.
   * @returns A new view plugin.
   */
  static define<V extends PluginValue, Arg = undefined>(create: (view: EditorView, arg: Arg) => V, spec?: PluginSpec<V>): ViewPlugin<V, Arg>;

  /**
   * Create a view plugin from a class constructor.
   *
   * @param cls - The class constructor.
   * @param spec - Optional plugin specification.
   * @returns A new view plugin.
   */
  static fromClass<V extends PluginValue, Arg = undefined>(cls: { new (view: EditorView, arg: Arg): V }, spec?: PluginSpec<V>): ViewPlugin<V, Arg>;

  /**
   * Create an extension from this plugin with the given argument.
   *
   * @param arg - The argument to pass to the plugin.
   * @returns An extension.
   */
  of(arg: Arg): Extension;
}
