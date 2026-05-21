import type {
  ChangeSet,
  ChangeSpec,
  Text
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  /**
   * Type used as argument to {@link @codemirror/state#EditorState.changes} and in the `changes` field of transaction
   * specs to succinctly describe document changes.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link @codemirror/state#ChangeSpec} instead.
   */
  type ChangeSpec__ =
    | {
      from: number;
      to?: number;
      insert?: string | Text;
    }
    | ChangeSet
    | readonly ChangeSpec[];
}
