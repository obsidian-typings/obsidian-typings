import type { ElectronMessagePortMain } from './ElectronMessagePortMain.d.ts';

/**
 * Event emitted when a `MessagePortMain` receives a message.
 *
 * @public
 * @unofficial
 */
export interface ElectronMessageEvent {
  /** The message payload. */
  data: unknown;

  /** The message ports transferred with the message. */
  ports: ElectronMessagePortMain[];
}
