import type { TurndownServiceFilter } from './TurndownServiceFilter.d.ts';
import type { TurndownServiceNode } from './TurndownServiceNode.d.ts';
import type { TurndownServiceOptions } from './TurndownServiceOptions.d.ts';
import type { TurndownServicePlugin } from './TurndownServicePlugin.d.ts';
import type { TurndownServiceRule } from './TurndownServiceRule.d.ts';
import type { TurndownServiceRules } from './TurndownServiceRules.d.ts';

/**
 * Converts HTML to Markdown.
 *
 * @public
 * @unofficial
 */
export declare class TurndownService {
  /** Current conversion options. */
  options: TurndownServiceOptions;

  /** Collection of conversion rules. */
  rules: TurndownServiceRules;

  /**
   * Create new instance of {@link TurndownService}.
   *
   * @param options - Options.
   */
  constructor(options?: TurndownServiceOptions);

  /**
   * Add a conversion rule.
   *
   * @param key - Rule identifier.
   * @param rule - The rule definition.
   * @returns This instance for chaining.
   */
  addRule(key: string, rule: TurndownServiceRule): this;

  /**
   * Escape a string for use in Markdown.
   *
   * @param str - The string to escape.
   * @returns The escaped string.
   */
  escape(str: string): string;

  /**
   * Keep elements matching a filter (pass through as HTML).
   *
   * @param filter - The filter to match.
   * @returns This instance for chaining.
   */
  keep(filter: TurndownServiceFilter): this;

  /**
   * Remove elements matching a filter from output.
   *
   * @param filter - The filter to match.
   * @returns This instance for chaining.
   */
  remove(filter: TurndownServiceFilter): this;

  /**
   * Convert HTML to Markdown.
   *
   * @param html - HTML string or DOM node to convert.
   * @returns The Markdown string.
   */
  turndown(html: string | TurndownServiceNode): string;

  /**
   * Register plugin(s).
   *
   * @param plugins - Plugin or array of plugins.
   * @returns This instance for chaining.
   */
  use(plugins: TurndownServicePlugin | TurndownServicePlugin[]): this;
}
