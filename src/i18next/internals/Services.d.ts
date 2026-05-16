import type { ResourceStore } from './ResourceStore.d.ts';

/**
 * Container for i18next service instances.
 *
 * @public
 * @unofficial
 */
export interface Services {
  /** The resource store service. */
  resourceStore: ResourceStore;

  /** Additional services. */
  [key: string]: unknown;
}
