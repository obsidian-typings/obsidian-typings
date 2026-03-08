import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { ShareReceiver } from '../../../internals/ShareReceiver.d.ts';

type ShareReceiverConstructor = ExtractConstructor<ShareReceiver>;

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
