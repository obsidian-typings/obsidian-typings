import type { Mermaid } from 'mermaid';

export {};

declare global {
  /**
   * Mermaid library instance for rendering diagrams and charts.
   * @unofficial
   */
  const mermaid: Mermaid;
}
