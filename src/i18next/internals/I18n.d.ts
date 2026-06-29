import type { AddResourceOptions } from './AddResourceOptions.d.ts';
import type { Callback } from './Callback.d.ts';
import type { GetResourceOptions } from './GetResourceOptions.d.ts';
import type { HasLoadedNamespaceOptions } from './HasLoadedNamespaceOptions.d.ts';
import type { I18nModules } from './I18nModules.d.ts';
import type { InitOptions } from './InitOptions.d.ts';
import type { Module } from './Module.d.ts';
import type { ModuleConstructor } from './ModuleConstructor.d.ts';
import type { ResourceStore } from './ResourceStore.d.ts';
import type { Services } from './Services.d.ts';
import type { TFunction } from './TFunction.d.ts';

/**
 * Main i18next instance interface.
 *
 * @public
 * @unofficial
 */
export interface I18n {
  /** Whether the instance has been initialized. */
  isInitialized: boolean;

  /** Whether the instance is currently initializing. */
  isInitializing: boolean;

  /** The language a change is currently in progress to, if any. */
  isLanguageChangingTo?: string;

  /** The active language code. */
  language: string;

  /** The list of languages in fallback order. */
  languages: readonly string[];

  /** The i18next logger instance. */
  logger: unknown;

  /** Loaded plugin modules. */
  modules: I18nModules;

  /** The registered event observers. */
  observers: unknown;

  /** The resolved initialization options. */
  options: InitOptions;

  /** The resolved language, if available. */
  resolvedLanguage?: string;

  /** The services container. */
  services: Services;

  /** The resource store. */
  store: ResourceStore;

  /** The translation function. */
  t: TFunction;

  /** The i18next translator instance. */
  translator: unknown;

  /**
   * Adds a single resource entry.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param key - Resource key.
   * @param value - Resource value.
   * @param options - Additional options including `keySeparator` and `silent`.
   * @returns The i18n instance.
   */
  addResource(lng: string, ns: string, key: string, value: string, options?: AddResourceOptions): I18n;

  /**
   * Adds a resource bundle.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param resources - Bundle of resources.
   * @param deep - Whether to deep merge.
   * @param overwrite - Whether to overwrite existing keys.
   * @returns The i18n instance.
   */
  addResourceBundle(lng: string, ns: string, resources: Record<string, unknown>, deep?: boolean, overwrite?: boolean): I18n;

  /**
   * Adds multiple resource entries.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @param resources - Resource entries.
   * @returns The i18n instance.
   */
  addResources(lng: string, ns: string, resources: Record<string, string>): I18n;

  /**
   * Changes the active language.
   *
   * @param lng - Language code.
   * @param callback - Optional callback.
   * @returns A promise resolving to the translation function.
   */
  changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>;

  /**
   * Creates a new i18next instance.
   *
   * @param options - Initialization options.
   * @param callback - Optional callback.
   * @returns A new i18n instance.
   */
  cloneInstance(options?: InitOptions, callback?: Callback): I18n;

  /**
   * Creates a new i18next instance.
   *
   * @param options - Initialization options.
   * @param callback - Optional callback.
   * @returns A new i18n instance.
   */
  createInstance(options?: InitOptions, callback?: Callback): I18n;

  /**
   * Returns the text direction for a language.
   *
   * @param lng - Language code.
   * @returns The text direction.
   */
  dir(lng?: string): 'ltr' | 'rtl';

  /**
   * Emits an event.
   *
   * @param event - Event name.
   * @param args - Event arguments.
   */
  emit(event: string, ...args: unknown[]): void;

  /**
   * Checks whether a translation key exists.
   *
   * @param key - Translation key.
   * @param options - Additional options.
   * @returns Whether the key exists.
   */
  exists(key: string | string[], options?: Record<string, unknown>): boolean;

  /**
   * Formats a value.
   *
   * @param value - The value to format.
   * @param format - The format string.
   * @param lng - Language code.
   * @param options - Additional options.
   * @returns The formatted string.
   */
  format(value: unknown, format?: string, lng?: string, options?: Record<string, unknown>): string;

  /**
   * Gets all resource data for a language.
   *
   * @param lng - Language code.
   * @returns The resource data or `undefined`.
   */
  getDataByLanguage(lng: string): Record<string, Record<string, string>> | undefined;

  /**
   * Gets a translation function fixed to a language and namespace.
   *
   * @param lng - Language code or codes.
   * @param ns - Namespace or namespaces.
   * @returns A fixed translation function.
   */
  getFixedT(lng: string | string[], ns?: string | string[]): TFunction;

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
   * Checks whether a namespace has been loaded.
   *
   * @param ns - Namespace or namespaces.
   * @param options - Additional options including `lng`.
   * @returns Whether the namespace has been loaded.
   */
  hasLoadedNamespace(ns: string | string[], options?: HasLoadedNamespaceOptions): boolean;

  /**
   * Checks whether a resource bundle exists.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @returns Whether the bundle exists.
   */
  hasResourceBundle(lng: string, ns: string): boolean;

  /**
   * Initializes the i18next instance.
   *
   * @param options - Initialization options.
   * @param callback - Optional callback.
   * @returns A promise resolving to the translation function.
   */
  init(options?: InitOptions, callback?: Callback): Promise<TFunction>;

  /**
   * Loads additional languages.
   *
   * @param lngs - Language code or codes.
   * @param callback - Optional callback.
   * @returns A promise that resolves when loading is complete.
   */
  loadLanguages(lngs: string | string[], callback?: Callback): Promise<void>;

  /**
   * Loads additional namespaces.
   *
   * @param ns - Namespace or namespaces.
   * @param callback - Optional callback.
   * @returns A promise that resolves when loading is complete.
   */
  loadNamespaces(ns: string | string[], callback?: Callback): Promise<void>;

  /**
   * Loads resources using the configured backend.
   *
   * @param callback - Optional callback.
   */
  loadResources(callback?: () => void): void;

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
   * Reloads resources for the given languages and namespaces.
   *
   * @param lngs - Language codes, or `null` for all.
   * @param ns - Namespaces, or `null` for all.
   * @param callback - Optional callback.
   * @returns A promise that resolves when reloading is complete.
   */
  reloadResources(lngs?: null | string[], ns?: null | string[], callback?: () => void): Promise<void>;

  /**
   * Removes a resource bundle.
   *
   * @param lng - Language code.
   * @param ns - Namespace.
   * @returns The i18n instance.
   */
  removeResourceBundle(lng: string, ns: string): I18n;

  /**
   * Sets the default namespace.
   *
   * @param ns - Namespace.
   */
  setDefaultNamespace(ns: string): void;

  /**
   * Registers a plugin module.
   *
   * @param module - The module, its constructor, or a factory function.
   * @returns The i18n instance.
   */
  use<T extends Module>(module: ((instance: I18n) => void) | ModuleConstructor<T> | T): this;
}
