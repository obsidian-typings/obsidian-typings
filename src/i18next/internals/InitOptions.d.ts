/**
 * Configuration options for initializing i18next.
 *
 * @public
 * @unofficial
 */
export interface InitOptions {
  /** Whether to enable debug mode. */
  debug?: boolean;

  /** Default namespace to use. */
  defaultNS?: false | string;

  /** Fallback language or languages when translation is not found. */
  fallbackLng?: false | string | string[];

  /** Fallback namespace or namespaces. */
  fallbackNS?: false | string | string[];

  /** Interpolation options. */
  interpolation?: {
    escapeValue?: boolean;
    prefix?: string;
    suffix?: string;
    [key: string]: unknown;
  };

  /** Active language code. */
  lng?: string;

  /** Namespace or namespaces to load. */
  ns?: string | string[];

  /** Pre-loaded translation resources. */
  resources?: Record<string, Record<string, Record<string, string>>>;

  /** List of supported language codes, or `false` to allow all. */
  supportedLngs?: false | string[];

  /** Additional options. */
  [key: string]: unknown;
}
