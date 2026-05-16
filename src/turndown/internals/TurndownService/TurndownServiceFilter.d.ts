import type { TurndownServiceFilterFunction } from './TurndownServiceFilterFunction.d.ts';
import type { TurndownServiceTagName } from './TurndownServiceTagName.d.ts';

/**
 * A filter that matches HTML elements by tag name(s) or a custom function.
 *
 * @public
 * @unofficial
 */
export type TurndownServiceFilter = TurndownServiceFilterFunction | TurndownServiceTagName | TurndownServiceTagName[];
