import type { Extension } from '@codemirror/state';
import type {
  DecorationSet,
  DOMEventHandlers
} from '@codemirror/view';

export {};

declare module '@codemirror/view' {
  interface PluginSpec<V extends PluginValue> {
    /**
     * Register event handlers for the plugin.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link eventHandlers} instead.
     */
    eventHandlers__?: DOMEventHandlers<V>;

    /**
     * Registers event observers for the plugin.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link eventObservers} instead.
     */
    eventObservers__?: DOMEventHandlers<V>;

    /**
     * Allow the plugin to provide decorations.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link decorations} instead.
     */
    decorations__?(value: V): DecorationSet;

    /**
     * Specify that the plugin provides additional extensions when added to an editor
     * configuration.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link provide} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matches real @codemirror/view API signature.
    provide__?(plugin: ViewPlugin<V, any>): Extension;
  }
}
