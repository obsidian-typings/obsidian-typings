import type { EditorState } from '../../@codemirror__state/internals/EditorState.d.ts';
import type { Extension } from '../../@codemirror__state/internals/Extension.d.ts';
import type { Facet } from '../../@codemirror__state/internals/Facet.d.ts';

/**
 * A language object manages parsing and provides language-specific metadata.
 *
 * @public
 * @unofficial
 */
export declare class Language {
  /** The data facet used by this language. */
  readonly data: Facet<{ [name: string]: unknown }, readonly { [name: string]: unknown }[]>;

  /** The language extension for use in an editor. */
  readonly extension: Extension;

  /** The name of this language. */
  readonly name: string;

  /**
   * Determine whether this language is active at the given position.
   *
   * @param state - The editor state.
   * @param pos - The position to check.
   * @param side - Which side of the position to check.
   * @returns Whether this language is active at the position.
   */
  isActiveAt(state: EditorState, pos: number, side?: -1 | 0 | 1): boolean;
}
