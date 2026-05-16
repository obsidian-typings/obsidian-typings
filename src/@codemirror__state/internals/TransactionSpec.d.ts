import type { Annotation } from './Annotation.d.ts';
import type { ChangeSpec } from './ChangeSpec.d.ts';
import type { CmEditorSelection } from './CmEditorSelection.d.ts';
import type { StateEffect } from './StateEffect.d.ts';

/**
 * Specification for a transaction.
 *
 * @public
 * @unofficial
 */
export interface TransactionSpec {
  /** Annotations to attach to the transaction. */
  annotations?: Annotation<unknown> | readonly Annotation<unknown>[];

  /** Changes to apply to the document. */
  changes?: ChangeSpec;

  /** Effects to apply with this transaction. */
  effects?: readonly StateEffect<unknown>[] | StateEffect<unknown>;

  /** Whether to suppress the default filtering behavior. */
  filter?: boolean;

  /** Scroll the cursor into view after applying the changes. */
  scrollIntoView?: boolean;

  /** The selection to set. */
  selection?: { anchor: number; head?: number } | CmEditorSelection;

  /** Whether effects should be applied one at a time. */
  sequential?: boolean;
}
