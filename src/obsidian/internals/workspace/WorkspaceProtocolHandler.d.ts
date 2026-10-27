import type {
  App,
  Events,
  ObsidianProtocolData,
  ObsidianProtocolHandler,
  TFile,
  Workspace
} from 'obsidian';

import type { getWorkspaceProtocolHandlerConstructor } from '../../implementations/constructors/internals/workspace/getWorkspaceProtocolHandlerConstructor.d.ts';

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
   * Registered handlers keyed by action name.
   */
  handlers: Map<string, ObsidianProtocolHandler>;

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
   * Register a handler for an action.
   *
   * @param name - The action name.
   * @param handler - The handler to invoke.
   * @throws Error if the action is already registered.
   */
  register(name: string, handler: ObsidianProtocolHandler): void;

  /**
   * Register the built-in handlers (`open`, `search`, `new`, etc.).
   */
  registerDefaultHandlers(): void;

  /**
   * Unregister a handler for an action.
   *
   * @param name - The action name.
   * @param handler - The handler to remove. If omitted, the action is removed unconditionally.
   */
  unregister(name: string, handler?: ObsidianProtocolHandler): void;
}
