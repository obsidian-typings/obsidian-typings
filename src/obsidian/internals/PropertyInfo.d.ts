/**
 * Information about a frontmatter property across the vault.
 *
 * @public
 * @unofficial
 */
export interface PropertyInfo {
  /**
   * Name of property.
   */
  name: string;

  /**
   * Usage count of property.
   */
  occurrences: number;

  /**
   * Type of property.
   */
  widget: string;
}
