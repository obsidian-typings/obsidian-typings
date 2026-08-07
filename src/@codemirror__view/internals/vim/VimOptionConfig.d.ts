import type { VimOptionScope } from './VimOptionScope.d.ts';

/**
 * Configuration deciding which copy of an option is read or written.
 *
 * @public
 * @unofficial
 */
export interface VimOptionConfig {
  /**
   * Which copy of the option to address. Omitted lets the editor argument decide.
   */
  scope?: VimOptionScope;
}
