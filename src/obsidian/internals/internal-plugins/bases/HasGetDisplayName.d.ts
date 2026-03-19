/**
 * Has get display name.
 *
 * @public
 * @unofficial
 */
export interface HasGetDisplayName {
  /**
   * Gets the display name.
   *
   * @param type - The type to get the display name for.
   * @returns The display name.
   */
  getDisplayName(type: string): string;
}
