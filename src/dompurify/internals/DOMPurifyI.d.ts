import type { Config } from './Config.d.ts';
import type { ConfigReturnDom } from './ConfigReturnDom.d.ts';
import type { ConfigReturnDomFragment } from './ConfigReturnDomFragment.d.ts';
import type { DOMPurifyRemovedItem } from './DOMPurifyRemovedItem.d.ts';
import type { HookEvent } from './HookEvent.d.ts';
import type { HookName } from './HookName.d.ts';

/**
 * DOMPurify instance interface providing HTML sanitization methods.
 *
 * @public
 * @unofficial
 */
export interface DOMPurifyI {
  /** Whether DOMPurify is supported in the current environment. */
  isSupported: boolean;

  /** Array of removed elements and attributes from the last sanitization. */
  removed: DOMPurifyRemovedItem[];

  /** The version of DOMPurify. */
  version: string;

  /**
   * Add a hook to DOMPurify.
   *
   * @param hook - The hook name.
   * @param cb - The callback to invoke.
   */
  addHook(hook: HookName, cb: (currentNode: Element, data: HookEvent, config: Config) => void): void;

  /** Clear the current configuration. */
  clearConfig(): void;

  /**
   * Check if an attribute is valid for a given tag.
   *
   * @param tag - The tag name.
   * @param attr - The attribute name.
   * @param value - The attribute value.
   * @returns Whether the attribute is valid.
   */
  isValidAttribute(tag: string, attr: string, value: string): boolean;

  /** Remove all hooks. */
  removeAllHooks(): void;

  /**
   * Remove a specific hook.
   *
   * @param entryPoint - The hook name.
   */
  removeHook(entryPoint: HookName): void;

  /**
   * Remove all callbacks for a specific hook.
   *
   * @param entryPoint - The hook name.
   */
  removeHooks(entryPoint: HookName): void;

  /**
   * Sanitize a string or DOM node.
   *
   * @param source - The input to sanitize.
   * @returns The sanitized string.
   */
  sanitize(source: Node | string): string;

  /**
   * Sanitize a string or DOM node and return a DocumentFragment.
   *
   * @param source - The input to sanitize.
   * @param config - Configuration with RETURN_DOM_FRAGMENT enabled.
   * @returns The sanitized DocumentFragment.
   */
  sanitize(source: Node | string, config: Config & ConfigReturnDomFragment): DocumentFragment;

  /**
   * Sanitize a string or DOM node and return an HTMLElement.
   *
   * @param source - The input to sanitize.
   * @param config - Configuration with RETURN_DOM enabled.
   * @returns The sanitized HTMLElement.
   */
  sanitize(source: Node | string, config: Config & ConfigReturnDom): HTMLElement;

  /**
   * Sanitize a string or DOM node with custom configuration.
   *
   * @param source - The input to sanitize.
   * @param config - The sanitization configuration.
   * @returns The sanitized string.
   */
  sanitize(source: Node | string, config: Config): string;

  /**
   * Set the configuration for DOMPurify.
   *
   * @param cfg - The configuration to set.
   */
  setConfig(cfg: Config): void;
}
