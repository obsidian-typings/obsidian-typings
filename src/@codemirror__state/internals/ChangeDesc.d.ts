/**
 * A change description is a variant of change set that doesn't store the inserted text.
 *
 * @public
 * @unofficial
 */
export declare class ChangeDesc {
  /** Whether the change set is empty (doesn't change anything). */
  get empty(): boolean;

  /** The length of the document before the change. */
  get length(): number;

  /**
   * Map a position through this change description.
   *
   * @param pos - The position to map.
   * @param assoc - The side to associate with (-1 for left, 1 for right).
   * @returns The mapped position.
   */
  mapPos(pos: number, assoc?: number): number;

  /** The length of the document after the change. */
  get newLength(): number;
}
