import type { ChangeSet } from './ChangeSet.d.ts';
import type { CmEditorSelection } from './CmEditorSelection.d.ts';
import type { CmText } from './CmText.d.ts';
import type { EditorState } from './EditorState.d.ts';
import type { StateEffect } from './StateEffect.d.ts';

/**
 * Changes to the editor state are grouped into transactions.
 *
 * @public
 * @unofficial
 */
export declare class Transaction {
  /** The change set for this transaction. */
  readonly changes: ChangeSet;

  /** The effects associated with this transaction. */
  readonly effects: readonly StateEffect<unknown>[];

  /** The selection set by this transaction, if any. */
  readonly selection: CmEditorSelection | undefined;

  /** The state before the transaction. */
  readonly startState: EditorState;

  /** Whether the document was changed by this transaction. */
  get docChanged(): boolean;

  /** The new document produced by this transaction. */
  get newDoc(): CmText;

  /** The new selection produced by this transaction. */
  get newSelection(): CmEditorSelection;

  /** Whether the state was reconfigured by this transaction. */
  get reconfigured(): boolean;

  /** The new state created by this transaction. */
  get state(): EditorState;
}
