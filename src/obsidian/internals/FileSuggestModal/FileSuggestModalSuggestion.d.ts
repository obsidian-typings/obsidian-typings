import type { FileSuggestModal } from './FileSuggestModal.d.ts';
import type { FileSuggestModalAliasSuggestion } from './FileSuggestModalAliasSuggestion.d.ts';
import type { FileSuggestModalBookmarkSuggestion } from './FileSuggestModalBookmarkSuggestion.d.ts';
import type { FileSuggestModalFileSuggestion } from './FileSuggestModalFileSuggestion.d.ts';
import type { FileSuggestModalUnresolvedSuggestion } from './FileSuggestModalUnresolvedSuggestion.d.ts';

/**
 * A suggestion offered by a {@link FileSuggestModal}, discriminated by its `type`.
 *
 * @public
 * @unofficial
 */
export type FileSuggestModalSuggestion =
  | FileSuggestModalAliasSuggestion
  | FileSuggestModalBookmarkSuggestion
  | FileSuggestModalFileSuggestion
  | FileSuggestModalUnresolvedSuggestion;
