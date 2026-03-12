/**
 * Configuration options for the note composer plugin.
 *
 * @public
 * @unofficial
 */
export interface NoteComposerPluginOptions {
  /** Whether to prompt for confirmation before merging notes. */
  askBeforeMerging?: boolean;

  /** What to leave in place of extracted content: a link, an embed, or nothing. */
  replacementText?: 'embed' | 'link' | 'none';

  /** Path to the template file used when extracting content into a new note. */
  template?: string;
}
