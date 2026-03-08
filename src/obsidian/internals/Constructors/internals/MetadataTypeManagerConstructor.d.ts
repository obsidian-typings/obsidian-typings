import type { App } from 'obsidian';
import type { MetadataTypeManager } from '../../MetadataTypeManager/MetadataTypeManager.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MetadataTypeManager constructor.
 *
 * @public
 * @unofficial
 */
export interface MetadataTypeManagerConstructor extends ConstructorBase<[app: App], MetadataTypeManager> {}
