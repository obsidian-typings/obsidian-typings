/**
 * Definition of a Mermaid diagram type.
 *
 * @public
 * @unofficial
 */
export interface DiagramDefinition {
  /** Database/data store for the diagram. */
  db: unknown;

  /** Parser for the diagram syntax. */
  parser: unknown;

  /** Renderer for the diagram. */
  renderer: unknown;

  /** Styles for the diagram. */
  styles?: unknown;
}
