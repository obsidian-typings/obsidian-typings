/**
 * A note's text split around one heading's section, as {@link obsidian#FileManager.insertIntoHeadingSection} reads it.
 *
 * Concatenating `before`, `heading`, `content` and `after` gives the original text.
 *
 * @public
 * @unofficial
 */
export interface HeadingSectionParts {
  /** The text after the section. */
  after: string;

  /** The text before the heading. */
  before: string;

  /** The section's text below the heading line. */
  content: string;

  /** The heading line. */
  heading: string;
}
