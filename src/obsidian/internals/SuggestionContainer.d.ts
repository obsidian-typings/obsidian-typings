import type { PopoverSuggest } from 'obsidian';

import type { SuggestModalChooser } from './SuggestModalChooser.d.ts';

/**
 * Container for displaying and navigating the suggestion items of a {@link obsidian#PopoverSuggest}.
 *
 * The popover and the suggest modal share one runtime class, so this is {@link SuggestModalChooser} with
 * the popover as its owner. Prefer `SuggestModalChooser<T, this>` when the more precise owner type is
 * available.
 *
 * @typeParam T - The type of the suggestion items.
 * @public
 * @unofficial
 */
export type SuggestionContainer<T> = SuggestModalChooser<T, PopoverSuggest<T>>;
