import type { ExternalDiagramDefinition } from './ExternalDiagramDefinition.d.ts';
import type { IconLoader } from './IconLoader.d.ts';
import type { LayoutLoaderDefinition } from './LayoutLoaderDefinition.d.ts';
import type { MermaidConfig } from './MermaidConfig.d.ts';
import type { ParseOptions } from './ParseOptions.d.ts';
import type { ParseResult } from './ParseResult.d.ts';
import type { RenderResult } from './RenderResult.d.ts';
import type { RunOptions } from './RunOptions.d.ts';

/**
 * Mermaid library instance for rendering diagrams and charts.
 *
 * @public
 * @unofficial
 */
export interface Mermaid {
  /** Whether to start rendering on page load. */
  startOnLoad: boolean;

  /** Trigger content loaded event. */
  contentLoaded(): void;

  /**
   * Detect the type of a Mermaid diagram from its text.
   *
   * @param text - The diagram text.
   * @returns The detected diagram type.
   */
  detectType(text: string): string;

  /**
   * Initialize Mermaid with the given configuration.
   *
   * @param config - The configuration options.
   */
  initialize(config: MermaidConfig): void;

  /**
   * Parse a Mermaid diagram definition.
   *
   * @param text - The diagram text to parse.
   * @param parseOptions - Options for parsing.
   * @returns A promise resolving to the parse result, or `false` if parsing failed.
   */
  parse(text: string, parseOptions?: ParseOptions): Promise<false | ParseResult>;

  /** Error handler for parse errors. */
  parseError?(err: string, hash: unknown): void;

  /* eslint-disable jsdoc/check-param-names -- TSDoc does not support dot-notation sub-params. */
  /**
   * Register external diagram definitions.
   *
   * @param diagrams - The external diagram definitions to register.
   * @param opts - Registration options including `lazyLoad`.
   * @returns A promise that resolves when registration is complete.
   */
  registerExternalDiagrams(diagrams: ExternalDiagramDefinition[], opts?: { lazyLoad?: boolean }): Promise<void>;
  /* eslint-enable jsdoc/check-param-names -- Re-enable after inline object param. */

  /**
   * Register icon packs.
   *
   * @param iconLoaders - The icon loader functions to register.
   */
  registerIconPacks(iconLoaders: IconLoader[]): void;

  /**
   * Register layout loaders.
   *
   * @param loaders - The layout loader definitions to register.
   */
  registerLayoutLoaders(loaders: LayoutLoaderDefinition[]): void;

  /**
   * Render a Mermaid diagram.
   *
   * @param id - The ID for the rendered diagram.
   * @param text - The diagram text to render.
   * @param container - Optional container element.
   * @returns A promise resolving to the render result.
   */
  render(id: string, text: string, container?: Element): Promise<RenderResult>;

  /**
   * Run Mermaid rendering on DOM elements.
   *
   * @param options - Options for the run.
   * @returns A promise that resolves when rendering is complete.
   */
  run(options?: RunOptions): Promise<void>;

  /**
   * Set a custom parse error handler.
   *
   * @param parseErrorHandler - The error handler function.
   */
  setParseErrorHandler(parseErrorHandler: (err: unknown, hash: unknown) => void): void;
}
