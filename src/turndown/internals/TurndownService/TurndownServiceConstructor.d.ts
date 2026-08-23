import type { TurndownService } from './TurndownService.d.ts';
import type { TurndownServiceOptions } from './TurndownServiceOptions.d.ts';

/**
 * The constructor of {@link TurndownService}.
 *
 * @public
 * @unofficial
 */
export interface TurndownServiceConstructor {
  /** The prototype every instance is created from. */
  prototype: TurndownService;

  /**
   * Creates a new {@link TurndownService}.
   *
   * @param options - Options.
   * @returns The new instance.
   */
  new (options?: TurndownServiceOptions): TurndownService;
}
