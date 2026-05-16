import type { TurndownServiceFilter } from './TurndownServiceFilter.d.ts';
import type { TurndownServiceOptions } from './TurndownServiceOptions.d.ts';
import type { TurndownServiceReplacementFunction } from './TurndownServiceReplacementFunction.d.ts';
import type { TurndownServiceRule } from './TurndownServiceRule.d.ts';

/**
 * Collection of rules used by TurndownService for HTML-to-Markdown conversion.
 *
 * @public
 * @unofficial
 */
export interface TurndownServiceRules {
  /** Array of registered rules. */
  array: TurndownServiceRule[];

  /** Replacement function for blank nodes. */
  blankRule: TurndownServiceReplacementFunction;

  /** Default replacement function when no rule matches. */
  defaultRule: TurndownServiceReplacementFunction;

  /** Replacement function for kept elements. */
  keepReplacement: TurndownServiceReplacementFunction;

  /** Current rule options. */
  options: TurndownServiceOptions;

  /**
   * Add a rule.
   *
   * @param key - Rule identifier.
   * @param rule - The rule to add.
   */
  add(key: string, rule: TurndownServiceRule): void;

  /**
   * Iterate over all rules.
   *
   * @param callback - Called for each rule.
   */
  forEach(callback: (rule: TurndownServiceRule, index: number) => void): void;

  /**
   * Find the matching rule for a node.
   *
   * @param node - The HTML element to match.
   * @returns The matching rule.
   */
  forNode(node: HTMLElement): TurndownServiceRule;

  /**
   * Keep elements matching a filter (pass through as HTML).
   *
   * @param filter - The filter to match.
   */
  keep(filter: TurndownServiceFilter): void;

  /**
   * Remove elements matching a filter from output.
   *
   * @param filter - The filter to match.
   */
  remove(filter: TurndownServiceFilter): void;
}
