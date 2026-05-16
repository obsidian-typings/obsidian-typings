import type { EditorState } from '../../@codemirror__state/internals/EditorState.d.ts';
import type { Transaction } from '../../@codemirror__state/internals/Transaction.d.ts';

/**
 * Configuration options for creating an editor view.
 *
 * @public
 * @unofficial
 */
export interface EditorViewConfig {
  /** The parent element or document fragment to mount the editor in. */
  parent?: DocumentFragment | Element;

  /** The document or shadow root to use. */
  root?: Document | ShadowRoot;

  /** The initial editor state. */
  state?: EditorState;

  /** A function to dispatch transactions. */
  dispatch?: (...trs: readonly Transaction[]) => void;
}
