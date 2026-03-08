import type { PropertyInfo } from '../PropertyInfo.d.ts';

/**
 * Record mapping property names to their metadata information across the vault.
 * @public
 * @unofficial
 */
export interface MetadataTypeManagerPropertiesRecord extends Record<string, PropertyInfo> {}
