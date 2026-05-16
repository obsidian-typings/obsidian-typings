import type { TurndownServiceOptions } from './TurndownServiceOptions.d.ts';

/**
 * Function that converts an HTML element's content to Markdown.
 *
 * @public
 * @unofficial
 */
export type TurndownServiceReplacementFunction = (content: string, node: HTMLElement, options: TurndownServiceOptions) => string;
