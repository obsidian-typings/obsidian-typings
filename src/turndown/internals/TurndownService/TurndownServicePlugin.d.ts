import type { TurndownService } from './TurndownService.d.ts';

/**
 * A plugin function that extends TurndownService.
 *
 * @public
 * @unofficial
 */
export type TurndownServicePlugin = (service: TurndownService) => void;
