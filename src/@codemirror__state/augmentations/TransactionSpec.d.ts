import type {
  Annotation,
  ChangeSpec,
  EditorSelection as CmEditorSelection,
  StateEffect,
  Transaction
} from '@codemirror/state';

import type { EditorStateSelectionSpec } from '../internals/EditorStateSelectionSpec.d.ts';

export {};

declare module '@codemirror/state' {
  interface TransactionSpec {
    /**
     * Set annotations for this transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link annotations} instead.
     */
    annotations__?: Annotation<unknown> | readonly Annotation<unknown>[];

    /**
     * The changes to the document made by this transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link changes} instead.
     */
    changes__?: ChangeSpec;

    /**
     * Attach state effects to this transaction.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link effects} instead.
     */
    effects__?: readonly StateEffect<unknown>[] | StateEffect<unknown>;

    /**
     * By default, transactions can be modified by change filters and transaction filters.
     * You can set this to `false` to disable that.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link filter} instead.
     */
    filter__?: boolean;

    /**
     * When set to `true`, the transaction is marked as needing to scroll the current
     * selection into view.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link scrollIntoView} instead.
     */
    scrollIntoView__?: boolean;

    /**
     * When set, this transaction explicitly updates the selection.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link selection} instead.
     */
    selection__?: CmEditorSelection | EditorStateSelectionSpec | undefined;

    /**
     * When true, positions in this spec refer to the document created by previous specs.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link sequential} instead.
     */
    sequential__?: boolean;

    /**
     * Shorthand for `annotations: Transaction.userEvent.of(...)`.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link userEvent} instead.
     */
    userEvent__?: string;
  }
}
