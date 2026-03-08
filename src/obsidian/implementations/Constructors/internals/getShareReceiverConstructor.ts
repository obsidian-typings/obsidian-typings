import type { App } from 'obsidian';
import type { ShareReceiverConstructor } from '../../../internals/Constructors/internals/ShareReceiverConstructor.ts';

/**
 * Get the ShareReceiver constructor.
 *
 * @param app - The app instance.
 * @returns The ShareReceiver constructor.
 *
 * @public
 * @unofficial
 */
export function getShareReceiverConstructor(app: App): ShareReceiverConstructor {
    return app.shareReceiver.constructor as ShareReceiverConstructor;
}
