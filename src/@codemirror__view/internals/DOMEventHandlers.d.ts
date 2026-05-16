import type { EditorView } from './EditorView.d.ts';
import type { PluginValue } from './PluginValue.d.ts';

/**
 * A mapping of DOM event names to handler functions for editor view plugins.
 *
 * @public
 * @unofficial
 */
export type DOMEventHandlers<V extends PluginValue> = {
  [K in keyof HTMLElementEventMap]?: (this: V, event: HTMLElementEventMap[K], view: EditorView) => boolean | void;
};
