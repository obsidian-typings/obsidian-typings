import type { ElectronKeyboardInputEvent } from './ElectronKeyboardInputEvent.d.ts';
import type { ElectronMouseInputEvent } from './ElectronMouseInputEvent.d.ts';
import type { ElectronMouseWheelInputEvent } from './ElectronMouseWheelInputEvent.d.ts';

/**
 * Any input event delivered to the `input-event` event of {@link ElectronWebContents}.
 *
 * @public
 * @unofficial
 */
export type ElectronAnyInputEvent = ElectronKeyboardInputEvent | ElectronMouseInputEvent | ElectronMouseWheelInputEvent;
