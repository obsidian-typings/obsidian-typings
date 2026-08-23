import type { PixiRenderOptions } from './PixiRenderOptions.d.ts';

/**
 * Library-wide PixiJS settings.
 *
 * @remark Only the settings Obsidian itself changes are described here.
 *
 * @public
 * @unofficial
 */
export interface PixiSettings {
  /** The options every renderer is created with unless overridden. */
  RENDER_OPTIONS: PixiRenderOptions;
}
