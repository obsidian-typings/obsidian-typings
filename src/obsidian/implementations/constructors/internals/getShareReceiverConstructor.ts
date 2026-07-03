import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { ShareReceiver } from '../../../internals/ShareReceiver.d.ts';

/**
 * Get the {@link ShareReceiver} constructor.
 *
 * @param app - The app instance.
 * @returns The {@link ShareReceiver} constructor.
 *
 * @public
 * @unofficial
 */
export function getShareReceiverConstructor(app: App): ExtractConstructor<ShareReceiver> {
  return app.shareReceiver.constructor as ExtractConstructor<ShareReceiver>;
}
