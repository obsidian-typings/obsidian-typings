import type { Mermaid } from '../../../mermaid/internals/Mermaid.d.ts';

export {};

declare global {
  /**
   * Mermaid library instance for rendering diagrams and charts.
   *
   * @unofficial
   */
  var mermaid: Mermaid;
}
