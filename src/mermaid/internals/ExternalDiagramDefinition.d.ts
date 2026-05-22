import type { DiagramDefinitionModule } from './DiagramDefinitionModule.d.ts';

/**
 * Definition for registering an external Mermaid diagram type.
 *
 * @public
 * @unofficial
 */
export interface ExternalDiagramDefinition {
  /** Unique identifier for the diagram type. */
  id: string;

  /**
   * Detect whether the given text matches this diagram type.
   *
   * @param text - The diagram text to check.
   * @returns Whether the text matches this diagram type.
   */
  detector(text: string): boolean;

  /**
   * Lazily load the diagram definition.
   *
   * @returns A promise resolving to the diagram definition.
   */
  loader(): Promise<DiagramDefinitionModule>;
}
