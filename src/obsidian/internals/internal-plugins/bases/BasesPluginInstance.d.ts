import type {
  App,
  BasesViewFactory,
  BasesViewRegistration,
  Editor,
  Menu,
  TAbstractFile,
  TFile,
  TFolder,
  UserEvent,
  WorkspaceLeaf
} from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { BasesPlugin } from './BasesPlugin.d.ts';
import type { BasesViewRegistrations } from './BasesViewRegistrations.d.ts';

/**
 * Bases plugin instance.
 *
 * @public
 * @unofficial
 */
export interface BasesPluginInstance extends InternalPluginInstance<BasesPlugin> {
  /**
   * An Obsidian app instance.
   */
  app: App;

  /**
   * Whether the default on.
   */
  defaultOn: boolean;

  /**
   * The Bases view registrations, keyed by view type.
   */
  registrations: BasesViewRegistrations;

  /**
   * Creates and embeds a base.
   *
   * @param editor - The editor to embed the base into.
   * @returns A promise that resolves when the base is created and embedded.
   */
  createAndEmbedBase(editor: Editor): Promise<void>;

  /**
   * Creates a new base next to the active file and opens it for renaming.
   *
   * @param evt - The event that triggered the creation. Falls back to the app's last event when omitted.
   * @returns A promise that resolves when the base is created and opened.
   */
  createAndOpenBase(evt?: UserEvent): Promise<void>;

  /**
   * Creates a new bases file.
   *
   * @param location - Optional folder location for the new file.
   * @param filename - Optional filename for the new file.
   * @param contents - Optional initial contents.
   * @returns The created file.
   */
  createNewBasesFile(location?: TFolder, filename?: string, contents?: string): Promise<TFile>;

  /**
   * Deregisters a view.
   *
   * @param type - The view type to deregister.
   */
  deregisterView(type: string): void;

  /**
   * Gets a Bases view registration.
   *
   * @param type - The view type to get the registration for.
   * @returns The registration, or `null` if no view of that type is registered.
   */
  getRegistration(type: string): BasesViewRegistration | null;

  /**
   * Gets all Bases view registrations.
   *
   * @returns The registrations, keyed by view type.
   */
  getRegistrations(): BasesViewRegistrations;

  /**
   * Gets the factory of a Bases view registration.
   *
   * @param type - The view type to get the factory for.
   * @returns The view factory, or `null` if no view of that type is registered.
   */
  getViewFactory(type: string): BasesViewFactory | null;

  /**
   * Adds the "new base" item to the editor context menu.
   *
   * @param menu - The context menu to extend.
   * @param editor - The editor the menu was opened in.
   */
  onEditorMenu(menu: Menu, editor: Editor): void;

  /**
   * On file menu.
   *
   * @param menu - The context menu to extend.
   * @param file - The target file or folder.
   * @param source - The source of the context menu event.
   * @param leaf - Optional workspace leaf context.
   */
  onFileMenu(menu: Menu, file: TAbstractFile, source: string, leaf?: WorkspaceLeaf): void;

  /**
   * Registers a Bases view. Shows an error notice instead when a view of that type is already registered.
   *
   * @param type - The view type identifier.
   * @param registration - The view registration.
   */
  registerView(type: string, registration: BasesViewRegistration): void;
}
