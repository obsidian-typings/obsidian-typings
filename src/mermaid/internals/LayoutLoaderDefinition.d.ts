/**
 * Definition for registering a Mermaid layout loader.
 *
 * @public
 * @unofficial
 */
export interface LayoutLoaderDefinition {
  /** Name of the layout. */
  name: string;

  /**
   * Lazily load the layout implementation.
   *
   * @returns A promise resolving to the layout implementation.
   */
  loader(): Promise<unknown>;
}
