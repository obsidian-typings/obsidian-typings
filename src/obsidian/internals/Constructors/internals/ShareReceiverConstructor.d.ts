import type { App } from 'obsidian';
import type { ShareReceiver } from '../../ShareReceiver.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ShareReceiver constructor.
 *
 * @public
 * @unofficial
 */
export interface ShareReceiverConstructor extends ConstructorBase<[app: App], ShareReceiver> {}
