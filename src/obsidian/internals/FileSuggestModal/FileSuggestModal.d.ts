import type {
  App,
  SuggestModal
} from 'obsidian';

import type { FileSuggestModalSuggestion } from './FileSuggestModalSuggestion.d.ts';

/**
 * Base suggest modal for choosing a file, shared by the quick switcher and the mobile "insert file" chooser.
 *
 * A `null` suggestion stands for creating a new file named after the query, offered when nothing matches and
 * {@link FileSuggestModal.supportsCreate} is `true`.
 *
 * @public
 * @unofficial
 */
export interface FileSuggestModal extends SuggestModal<FileSuggestModalSuggestion | null> {
  /**
   * Whether the modal may create a new file named after the query.
   */
  allowCreateNewFile: boolean;

  /**
   * Which registry decides whether a non-image attachment extension is offered: `view` asks the view registry,
   * `embed` the embed registry.
   */
  context: 'embed' | 'view';

  /**
   * The "create file" button, shown in the input on mobile while {@link FileSuggestModal.allowCreateNewFile} is
   * `true`.
   */
  createButtonEl: HTMLButtonElement;

  /**
   * Whether the frontmatter aliases of each file are matched against the query as well.
   */
  shouldShowAlias: boolean;

  /**
   * Whether files of every extension are offered, registered or not, when
   * {@link FileSuggestModal.shouldShowNonImageAttachments} is `true`.
   */
  shouldShowAllTypes: boolean;

  /**
   * Whether image files are offered.
   */
  shouldShowImages: boolean;

  /**
   * Whether Markdown files are offered.
   */
  shouldShowMarkdown: boolean;

  /**
   * Whether canvas and base files are offered.
   */
  shouldShowNonAttachments: boolean;

  /**
   * Whether bookmarks that are not file bookmarks (folders, searches, graphs, URLs) are offered.
   */
  shouldShowNonFileBookmarks: boolean;

  /**
   * Whether non-image attachments with a registered extension are offered.
   */
  shouldShowNonImageAttachments: boolean;

  /**
   * Whether the link text of unresolved links is offered.
   */
  shouldShowUnresolved: boolean;

  /**
   * Whether creating a new file is offered: {@link FileSuggestModal.allowCreateNewFile} and
   * {@link FileSuggestModal.shouldShowMarkdown} are both `true`.
   */
  readonly supportsCreate: boolean;

  /**
   * Constructor.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__?(app: App): this;

  /**
   * Gets the suggestions for a query.
   *
   * The query is trimmed first. An empty query returns the recent files that are offered and not excluded by the
   * user, with a `null` match. Otherwise every offered vault file is fuzzy-matched by its path (without the `.md`
   * extension), and, when {@link FileSuggestModal.shouldShowAlias} is `true`, by each of its frontmatter aliases; a
   * file excluded by the user is kept but its score is lowered by `10`. Unresolved link text and
   * bookmarks are added when enabled, and the result is sorted by descending score.
   *
   * @param query - The query.
   * @returns The suggestions.
   */
  getSuggestions(query: string): FileSuggestModalSuggestion[];

  /**
   * Renders a suggestion.
   *
   * @param value - The suggestion, or `null` for the "create new file" suggestion.
   * @param el - The element to render into.
   */
  renderSuggestion(value: FileSuggestModalSuggestion | null, el: HTMLElement): void;
}
