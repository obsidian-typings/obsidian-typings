import type { App } from 'obsidian';

import type { MetadataEditor } from './MetadataEditor.d.ts';

/**
 * Context provided to property widgets for rendering and interaction.
 *
 * @public
 * @unofficial
 */
export interface PropertyRenderContext {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Key of the property field.
   */
  key: string;

  /**
   * Determine the source path of current context.
   */
  sourcePath: string;

  /**
   * Callback called on property field unfocus.
   */
  blur(): void;

  /**
   * Filter applied by the property-value suggest to its plain-text suggestions.
   *
   * @param value - The suggested value.
   * @returns Whether to keep the suggestion.
   */
  filterSuggestion?(value: string): boolean;

  /**
   * Callback called on property value change.
   *
   * @param value - The new property value.
   */
  onChange(value: unknown): void;
}
