import type {
  App,
  EventRef,
  Events,
  ObsidianProtocolData,
  ObsidianProtocolHandler,
  TFile,
  Workspace
} from 'obsidian';

import type { getWorkspaceProtocolHandlerConstructor } from '../../implementations/constructors/internals/workspace/getWorkspaceProtocolHandlerConstructor.d.ts';
import type { PromisedQueue } from '../PromisedQueue.d.ts';

/**
 * Dispatches Obsidian URI (`obsidian://`) actions to registered protocol handlers.
 *
 * @public
 * @unofficial
 */
export interface WorkspaceProtocolHandler extends Events {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Queue that serializes the dispatching of incoming URI actions.
   */
  dispatchQueue: PromisedQueue;

  /**
   * Registered handlers keyed by action name.
   */
  handlers: Map<string, ObsidianProtocolHandler>;

  /**
   * Display names of the plugins that registered each action, keyed by action name.
   */
  sources: Record<string, string>;

  /**
   * Actions the user has chosen to always trust, keyed by action name.
   * Persisted in local storage.
   */
  trustedActions: Record<string, boolean>;

  /**
   * Reference to the workspace.
   */
  workspace: Workspace;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getWorkspaceProtocolHandlerConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @param workspace - The workspace.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor2__?(app: App, workspace: Workspace): this;

  /**
   * Dispatch a parsed URI action to its registered handler.
   *
   * @param params - The parsed URI action parameters.
   */
  dispatch(params: ObsidianProtocolData): void;

  /**
   * Parse and dispatch a Capacitor (mobile) deep-link URL.
   * Reloads the app into the target vault if the URL points at a different vault.
   *
   * @param url - The raw `obsidian://` URL.
   */
  execCapacitorUrl(url: string): void;

  /**
   * Get the display name of the plugin that registered an action.
   *
   * @param name - The action name.
   * @returns The source plugin display name, or `null` if none is registered.
   */
  getSource(name: string): null | string;

  /**
   * Get the names of all trusted actions.
   *
   * @returns The trusted action names.
   */
  getTrustedActions(): string[];

  /**
   * Handle the `x-success` / `x-error` callbacks of an x-callback-url action.
   *
   * @param params - The parsed URI action parameters.
   * @param file - The file associated with the callback.
   * @returns Whether the callback was handled.
   */
  handleXCallback(params: ObsidianProtocolData, file: TFile): boolean;

  /**
   * Install the global URI action hook (`window.OBS_ACT`) and, on mobile, the Capacitor app-url listener.
   */
  init(): void;

  /**
   * Triggered when the set of trusted actions changes.
   *
   * @param name - Should be `'change'`.
   * @param callback - The callback function.
   * @param ctx - The context passed as `this` to the `callback` function.
   * @returns The event reference.
   */
  on(name: 'change', callback: () => unknown, ctx?: unknown): EventRef;

  /**
   * Open a confirmation dialog and resolve with the user's choice.
   *
   * @param fragmentEl - The dialog content.
   * @param action - The action name.
   * @returns A promise that resolves with `'once'`, `'trust'`, or `false` if the user cancelled.
   */
  promptConfirmation(fragmentEl: DocumentFragment, action: string): Promise<'once' | 'trust' | false>;

  /**
   * Register a handler for an action.
   *
   * @param name - The action name.
   * @param handler - The handler to invoke.
   * @param source - The display name of the registering plugin.
   * @throws Error if the action is already registered.
   */
  register(name: string, handler: ObsidianProtocolHandler, source?: string): void;

  /**
   * Register the built-in handlers (`open`, `search`, `new`, etc.).
   */
  registerDefaultHandlers(): void;

  /**
   * Remove an action from the trusted list.
   *
   * @param name - The action name.
   */
  removeTrustedAction(name: string): void;

  /**
   * Show the confirmation modal for an untrusted action and resolve whether to proceed.
   *
   * @param params - The parsed URI action parameters.
   * @returns A promise that resolves to whether the action should proceed.
   */
  showConfirmModal(params: ObsidianProtocolData): Promise<boolean>;

  /**
   * Unregister a handler for an action.
   *
   * @param name - The action name.
   * @param handler - The handler to remove. If omitted, the action is removed unconditionally.
   */
  unregister(name: string, handler?: ObsidianProtocolHandler): void;
}
