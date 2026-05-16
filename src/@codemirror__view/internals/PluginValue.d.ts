import type { ViewUpdate } from './ViewUpdate.d.ts';

/**
 * The interface that view plugin values must conform to.
 *
 * @public
 * @unofficial
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- CodeMirror's actual type extends Object.
export interface PluginValue extends Object {
  /** Called when the plugin is destroyed. */
  destroy?(): void;

  /**
   * Called when the editor view is updated.
   *
   * @param update - The view update.
   */
  update?(update: ViewUpdate): void;
}
