/**
 * Configuration options for TurndownService.
 *
 * @public
 * @unofficial
 */
export interface TurndownServiceOptions {
  /** Line break replacement string. */
  br?: string;
  /** Bullet list marker character. */
  bulletListMarker?: '-' | '*' | '+';
  /** Code block style. */
  codeBlockStyle?: 'fenced' | 'indented';
  /** Emphasis delimiter character. */
  emDelimiter?: '_' | '*';
  /** Fence delimiter string. */
  fence?: '```' | '~~~';
  /** Heading style. */
  headingStyle?: 'atx' | 'setext';
  /** Horizontal rule replacement string. */
  hr?: string;
  /** Link reference style. */
  linkReferenceStyle?: 'collapsed' | 'full' | 'shortcut';
  /** Link style. */
  linkStyle?: 'inlined' | 'referenced';
  /** Whether to use preformatted code blocks. */
  preformattedCode?: boolean;
  /** Strong delimiter string. */
  strongDelimiter?: '__' | '**';
}
