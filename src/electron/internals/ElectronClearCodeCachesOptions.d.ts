/**
 * Options controlling which code caches are cleared.
 *
 * @public
 * @unofficial
 */
export interface ElectronClearCodeCachesOptions {
  /** An array of URLs corresponding to the resources whose generated code cache needs to be removed. If empty, all entries are removed. */
  urls?: string[];
}
