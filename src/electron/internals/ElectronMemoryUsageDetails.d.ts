/**
 * Usage information for one of Blink's internal memory caches.
 *
 * @public
 * @unofficial
 */
export interface ElectronMemoryUsageDetails {
  /** The number of objects in the cache. */
  count: number;

  /** The size of the live objects in the cache, in bytes. */
  liveSize: number;

  /** The total size of the cache, in bytes. */
  size: number;
}
