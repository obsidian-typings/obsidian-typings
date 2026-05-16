import type { Extension } from '../../@codemirror__state/internals/Extension.d.ts';
import type { DecorationSet } from './DecorationSet.d.ts';
import type { DOMEventHandlers } from './DOMEventHandlers.d.ts';
import type { PluginValue } from './PluginValue.d.ts';
import type { ViewPlugin } from './ViewPlugin.d.ts';

/**
 * Specification for creating a view plugin.
 *
 * @public
 * @unofficial
 */
export interface PluginSpec<V extends PluginValue> {
  /** DOM event handlers bound to the plugin value. */
  eventHandlers?: DOMEventHandlers<V>;

  /** DOM event observers bound to the plugin value. */
  eventObservers?: DOMEventHandlers<V>;

  /** A function to compute decorations from the plugin value. */
  decorations?: (value: V) => DecorationSet;

  /** A function to provide an extension from the plugin. */
  provide?: (plugin: ViewPlugin<V>) => Extension;
}
