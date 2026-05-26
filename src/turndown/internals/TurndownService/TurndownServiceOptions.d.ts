import type { TurndownServiceReplacementFunction } from './TurndownServiceReplacementFunction.d.ts';

/**
 * Configuration options for TurndownService.
 *
 * @public
 * @unofficial
 */
export interface TurndownServiceOptions {
  /** Custom replacement function for blank nodes. */
  blankReplacement?: TurndownServiceReplacementFunction;
  /** Line break replacement string. */
  br?: string;
  /** Bullet list marker character. */
  bulletListMarker?: '-' | '*' | '+';
  /** Code block style. */
  codeBlockStyle?: 'fenced' | 'indented';
  /** Custom default replacement function. */
  defaultReplacement?: TurndownServiceReplacementFunction;
  /** Emphasis delimiter character. */
  emDelimiter?: '_' | '*';
  /** Fence delimiter string. */
  fence?: '```' | '~~~';
  /** Heading style. */
  headingStyle?: 'atx' | 'setext';
  /** Horizontal rule replacement string. */
  hr?: string;
  /** Custom replacement function for kept elements. */
  keepReplacement?: TurndownServiceReplacementFunction;
  /** Link reference style. */
  linkReferenceStyle?: 'collapsed' | 'full' | 'shortcut';
  /** Link style. */
  linkStyle?: 'inlined' | 'referenced';
  /** Whether to use preformatted code blocks. */
  preformattedCode?: boolean;
  /** Strong delimiter string. */
  strongDelimiter?: '__' | '**';
}
