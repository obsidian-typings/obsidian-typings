import type { Extension } from '@codemirror/state';

export {};

declare module '@codemirror/view' {
  interface ViewPlugin<V extends PluginValue, Arg> {
    /**
     * When `Arg` is `undefined`, instances of this class act as extensions. Otherwise, you have
     * to call `of` to create an extension value.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link extension} instead.
     */
    readonly extension__: Arg extends undefined ? Extension : null;

    /**
     * Create an extension for this plugin with the given argument.
     *
     * @param arg - The argument.
     * @returns The extension.
     * @official
     */
    of(arg: Arg): Extension;
  }

  namespace ViewPlugin {
    /**
     * Define a plugin from a constructor function that creates the plugin's value, given an
     * editor view.
     *
     * @param create - The constructor function.
     * @param spec - The plugin spec.
     * @returns The view plugin.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link ViewPlugin.define} instead.
     */
    function define__<V extends PluginValue, Arg = undefined>(create: (view: EditorView, arg: Arg) => V, spec?: PluginSpec<V>): ViewPlugin<V, Arg>;

    /**
     * Create a plugin for a class whose constructor takes a single editor view as argument.
     *
     * @param cls - The class constructor.
     * @param spec - The plugin spec.
     * @returns The view plugin.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link ViewPlugin.fromClass} instead.
     */
    function fromClass__<V extends PluginValue, Arg = undefined>(cls: { new (view: EditorView, arg: Arg): V }, spec?: PluginSpec<V>): ViewPlugin<V, Arg>;
  }
}
