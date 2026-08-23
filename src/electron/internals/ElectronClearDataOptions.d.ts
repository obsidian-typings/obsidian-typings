/**
 * Options controlling which browsing data is cleared.
 *
 * @public
 * @unofficial
 */
export interface ElectronClearDataOptions {
  /** The types of data to avoid clearing. Cannot be used together with `dataTypes`. */
  avoidDataTypes?: string[];

  /** The types of data to clear. If not specified, clear every data type. */
  dataTypes?: string[];

  /** How the origins listed in `origins` are matched. */
  originMatchingMode?: 'registrable-domain' | 'third-parties-included';

  /** The origins to clear the data of, in the `scheme://host:port` representation of `window.location.origin`. */
  origins?: string[];
}
