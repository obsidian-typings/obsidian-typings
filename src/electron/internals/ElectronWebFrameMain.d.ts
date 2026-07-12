import type { ElectronMessagePortMain } from './ElectronMessagePortMain.d.ts';

/**
 * A frame in the main process, representing a renderer frame.
 *
 * Note: The upstream `static fromId(processId, routingId)` factory cannot be expressed on a plain
 * interface and is therefore omitted here.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebFrameMain {
  /** A collection containing the direct descendents of this frame. */
  readonly frames: ElectronWebFrameMain[];

  /** A collection containing every frame in the subtree of this frame, including itself. */
  readonly framesInSubtree: ElectronWebFrameMain[];

  /** The id of the frame's internal FrameTreeNode instance. Browser-global and uniquely identifies a frame that hosts content. */
  readonly frameTreeNodeId: number;

  /** The frame name. */
  readonly name: string;

  /** The operating system `pid` of the process which owns this frame. */
  readonly osProcessId: number;

  /** The parent frame, or `null` if this is the top frame in the frame hierarchy. */
  readonly parent: ElectronWebFrameMain | null;

  /** The Chromium internal `pid` of the process which owns this frame. */
  readonly processId: number;

  /** The unique frame id in the current renderer process. */
  readonly routingId: number;

  /** The top frame in the frame hierarchy to which this frame belongs, or `null`. */
  readonly top: ElectronWebFrameMain | null;

  /** The current URL of the frame. */
  readonly url: string;

  /** The visibility state of the frame. */
  readonly visibilityState: string;

  /**
   * Registers a listener for the `dom-ready` event, emitted when the document is loaded.
   *
   * @param event - The event name.
   * @param listener - Called when the document is loaded.
   * @returns This frame instance.
   */
  addListener(event: 'dom-ready', listener: () => void): this;

  /**
   * Evaluates `code` in the page.
   *
   * @param code - The JavaScript code to execute.
   * @param userGesture - Whether the execution should be treated as a user gesture.
   * @returns A promise resolving with the result of the executed code.
   */
  executeJavaScript(code: string, userGesture?: boolean): Promise<unknown>;

  /**
   * Registers a listener for the `dom-ready` event, emitted when the document is loaded.
   *
   * @param event - The event name.
   * @param listener - Called when the document is loaded.
   * @returns This frame instance.
   */
  on(event: 'dom-ready', listener: () => void): this;

  /**
   * Registers a one-time listener for the `dom-ready` event.
   *
   * @param event - The event name.
   * @param listener - Called when the document is loaded.
   * @returns This frame instance.
   */
  once(event: 'dom-ready', listener: () => void): this;

  /**
   * Sends a message to the renderer process, optionally transferring ownership of `MessagePortMain` objects.
   *
   * @param channel - The channel name.
   * @param message - The message to send.
   * @param transfer - Message ports whose ownership is transferred with the message.
   */
  postMessage(channel: string, message: unknown, transfer?: ElectronMessagePortMain[]): void;

  /**
   * Reloads the frame.
   *
   * @returns Whether the reload was initiated successfully. Only `false` when the frame has no history.
   */
  reload(): boolean;

  /**
   * Removes a previously registered `dom-ready` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This frame instance.
   */
  removeListener(event: 'dom-ready', listener: () => void): this;

  /**
   * Sends an asynchronous message to the renderer process via `channel`, along with arguments.
   *
   * @param channel - The channel name.
   * @param args - Arguments to serialize and send.
   */
  send(channel: string, ...args: unknown[]): void;
}
