import type { Grammar } from './Grammar.d.ts';
import type { GrammarValue } from './GrammarValue.d.ts';
import type { LanguageMap } from './LanguageMap.d.ts';

/**
 * Protocol for extending and modifying Prism language definitions.
 *
 * @public
 * @unofficial
 */
export interface LanguageMapProtocol {
  /**
   * Creates a new grammar by extending an existing language definition.
   *
   * @param id - The language identifier to extend.
   * @param redef - Token definitions to add or override.
   * @returns The new grammar.
   */
  extend(id: string, redef: Record<string, GrammarValue>): Grammar;

  /**
   * Inserts tokens before an existing token in a grammar.
   *
   * @param inside - The language identifier.
   * @param before - The token name to insert before.
   * @param insert - The tokens to insert.
   * @param root - Optional root language map.
   * @returns The modified grammar.
   */
  insertBefore(inside: string, before: string, insert: Record<string, GrammarValue>, root?: LanguageMap): Grammar;
}
