import type { AddResourceOptions } from './AddResourceOptions.d.ts';
import type { GetResourceOptions } from './GetResourceOptions.d.ts';
import type { InitOptions } from './InitOptions.d.ts';

/**
 * Store for managing i18next translation resources.
 *
 * @public
 * @unofficial
 */
export interface ResourceStore {
  /** The underlying resource data. */
  data: Record<string, Record<string, Record<string, string>>>;

  /** The options used by this resource store. */
  options: InitOptions;

  /**
   * Adds a single resource entry.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param key - Resource key.
   * @param value - Resource value.
   * @param options - Additional options including `keySeparator` and `silent`.
   * @returns The resource store instance.
   */
  addResource(lng: string, ns: string, key: string, value: string, options?: AddResourceOptions): ResourceStore;

  /**
   * Adds a resource bundle to the store.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param resources - Bundle of resources.
   * @param deep - Whether to deep merge.
   * @param overwrite - Whether to overwrite existing keys.
   * @returns The resource store instance.
   */
  addResourceBundle(lng: string, ns: string, resources: Record<string, unknown>, deep?: boolean, overwrite?: boolean): ResourceStore;

  /**
   * Adds multiple resource entries.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param resources - Resource entries.
   * @returns The resource store instance.
   */
  addResources(lng: string, ns: string, resources: Record<string, string>): ResourceStore;

  /**
   * Gets all resource data for a language.
   *
   * @param lng - Language code.
   * @returns The resource data or `undefined`.
   */
  getDataByLanguage(lng: string): Record<string, Record<string, string>> | undefined;

  /**
   * Gets a single resource value.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param key - Resource key.
   * @param options - Additional options including `keySeparator`.
   * @returns The resource value.
   */
  getResource(lng: string, ns: string, key: string, options?: GetResourceOptions): unknown;

  /**
   * Gets a resource bundle for a language and namespace.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @returns The resource bundle.
   */
  getResourceBundle(lng: string, ns: string): Record<string, unknown>;

  /**
   * Checks whether a resource bundle exists.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @returns Whether the bundle exists.
   */
  hasResourceBundle(lng: string, ns: string): boolean;

  /**
   * Removes a listener for an event.
   *
   * @param event - Event name.
   * @param listener - Listener function.
   */
  off(event: string, listener?: (...args: unknown[]) => void): void;

  /**
   * Registers a listener for an event.
   *
   * @param event - Event name.
   * @param listener - Listener function.
   */
  on(event: string, listener: (...args: unknown[]) => void): void;

  /**
   * Removes a resource bundle.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @returns The resource store instance.
   */
  removeResourceBundle(lng: string, ns: string): ResourceStore;
}
