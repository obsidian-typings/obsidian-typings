import type { CmEditorSelection } from './CmEditorSelection.d.ts';
import type { CmText } from './CmText.d.ts';
import type { EditorStateConfig } from './EditorStateConfig.d.ts';
import type { Facet } from './Facet.d.ts';
import type { StateField } from './StateField.d.ts';
import type { Transaction } from './Transaction.d.ts';
import type { TransactionSpec } from './TransactionSpec.d.ts';

/**
 * The editor state class is a persistent (immutable) data structure.
 *
 * @public
 * @unofficial
 */
export declare class EditorState {
  /** The current document. */
  readonly doc: CmText;

  /** The current selection. */
  readonly selection: CmEditorSelection;

  /**
   * Create a new state.
   *
   * @param config - The state configuration.
   * @returns The created state.
   */
  static create(config?: EditorStateConfig): EditorState;

  /**
   * Get the value of a facet.
   *
   * @param facet - The facet to get.
   * @returns The facet value.
   */
  facet<Output>(facet: Facet<unknown, Output>): Output;

  /**
   * Get the value of a state field.
   *
   * @param field - The state field.
   * @returns The field value.
   */
  field<T>(field: StateField<T>): T;
  /**
   * Get the value of a state field, returning `undefined` if the field is not present.
   *
   * @param field - The state field.
   * @param require - Whether to require the field to be present.
   * @returns The field value, or `undefined`.
   */
  field<T>(field: StateField<T>, require: false): T | undefined;

  /**
   * Get the text between the given positions.
   *
   * @param from - The start position.
   * @param to - The end position.
   * @returns The text content.
   */
  sliceDoc(from?: number, to?: number): string;

  /**
   * Create a transaction that updates the state.
   *
   * @param specs - The transaction specifications.
   * @returns The created transaction.
   */
  update(...specs: readonly TransactionSpec[]): Transaction;
}
