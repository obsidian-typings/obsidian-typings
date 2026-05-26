import type { Grammar } from './Grammar.d.ts';
import type { GrammarValue } from './GrammarValue.d.ts';

/**
 * Common grammar token names with optional rest grammar reference.
 *
 * @public
 * @unofficial
 */
export interface GrammarRest {
  /** ATRule grammar value. */
  'atrule'?: GrammarValue;

  /** Boolean grammar value. */
  'boolean'?: GrammarValue;

  /** Class name grammar value. */
  'class-name'?: GrammarValue;

  /** Comment grammar value. */
  'comment'?: GrammarValue;

  /** Function grammar value. */
  'function'?: GrammarValue;

  /** Important grammar value. */
  'important'?: GrammarValue;

  /** Keyword grammar value. */
  'keyword'?: GrammarValue;

  /** Number grammar value. */
  'number'?: GrammarValue;

  /** Operator grammar value. */
  'operator'?: GrammarValue;

  /** Property grammar value. */
  'property'?: GrammarValue;

  /** Punctuation grammar value. */
  'punctuation'?: GrammarValue;

  /** Nested rest grammar. */
  'rest'?: Grammar;

  /** Selector grammar value. */
  'selector'?: GrammarValue;

  /** String grammar value. */
  'string'?: GrammarValue;

  /** Style grammar value. */
  'style'?: GrammarValue;

  /** URL grammar value. */
  'url'?: GrammarValue;
}
