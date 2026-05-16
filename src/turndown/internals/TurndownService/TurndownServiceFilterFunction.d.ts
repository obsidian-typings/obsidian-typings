import type { TurndownServiceOptions } from './TurndownServiceOptions.d.ts';

/**
 * Function that tests whether a node matches a filter.
 *
 * @public
 * @unofficial
 */
export type TurndownServiceFilterFunction = (node: HTMLElement, options: TurndownServiceOptions) => boolean;
