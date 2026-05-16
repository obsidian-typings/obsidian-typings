import type { ChangeSet } from '../../@codemirror__state/internals/ChangeSet.d.ts';
import type { EditorState } from '../../@codemirror__state/internals/EditorState.d.ts';
import type { Transaction } from '../../@codemirror__state/internals/Transaction.d.ts';
import type { EditorView } from './EditorView.d.ts';

/**
 * An update to an editor view, containing the transactions and state changes.
 *
 * @public
 * @unofficial
 */
export declare class ViewUpdate {
  /** The change set for this update. */
  readonly changes: ChangeSet;

  /** The start state before this update. */
  readonly startState: EditorState;

  /** The new editor state after this update. */
  readonly state: EditorState;

  /** The transactions that produced this update. */
  readonly transactions: readonly Transaction[];

  /** The editor view that was updated. */
  readonly view: EditorView;

  /** Whether the document content changed. */
  get docChanged(): boolean;

  /** Whether the editor focus state changed. */
  get focusChanged(): boolean;

  /** Whether the editor geometry changed. */
  get geometryChanged(): boolean;

  /** Whether the editor height changed. */
  get heightChanged(): boolean;

  /** Whether a new selection was explicitly set. */
  get selectionSet(): boolean;

  /** Whether the visible viewport changed. */
  get viewportChanged(): boolean;
}
