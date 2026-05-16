import type {
  ChangeSet,
  ChangeSpec,
  Text
} from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  /**
   * Type used as argument to `EditorState.changes` and in the `changes` field of transaction
   * specs to succinctly describe document changes.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link ChangeSpec} instead.
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
