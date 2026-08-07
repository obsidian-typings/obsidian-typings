/**
 * The most recent character search, so `;` and `,` can repeat it.
 *
 * @public
 * @unofficial
 */
export interface VimLastCharacterSearch {
  /**
   * Whether the search ran towards the end of the line.
   */
  forward: boolean;

  /**
   * How far the cursor stops short of the match: `0` lands on it as `f` does, and a non-zero offset
   * stops beside it as `t` does.
   */
  increment: number;

  /**
   * The character that was searched for.
   */
  selectedCharacter: string;
}
