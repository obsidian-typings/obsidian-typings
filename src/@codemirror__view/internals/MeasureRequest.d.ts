import type { EditorView } from '@codemirror/view';

/**
 * A request for a layout measurement on the editor view.
 *
 * @public
 * @unofficial
 */
export interface MeasureRequest<T> {
  /** An optional key used to deduplicate requests. */
  key?: unknown;

  /**
   * Read a value from the editor's DOM layout.
   *
   * @param view - The editor view.
   * @returns The measured value.
   */
  read(view: EditorView): T;

  /**
   * Write layout changes based on the measured value.
   *
   * @param measure - The measured value.
   * @param view - The editor view.
   */
  write?(measure: T, view: EditorView): void;
}
