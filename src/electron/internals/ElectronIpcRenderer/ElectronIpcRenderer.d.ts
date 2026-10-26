import type { IpcRendererEvent } from '../IpcRendererEvent.d.ts';
import type { ObsidianIpcCurrentVault } from './ObsidianIpcCurrentVault.d.ts';
import type { ObsidianIpcMenuItemStateUpdate } from './ObsidianIpcMenuItemStateUpdate.d.ts';
import type { ObsidianIpcPolicy } from './ObsidianIpcPolicy.d.ts';
import type { ObsidianIpcPrintToPdfOptions } from './ObsidianIpcPrintToPdfOptions.d.ts';
import type { ObsidianIpcRegisterCliResult } from './ObsidianIpcRegisterCliResult.d.ts';
import type { ObsidianIpcRequestUrlParams } from './ObsidianIpcRequestUrlParams.d.ts';
import type { ObsidianIpcSetMenuParams } from './ObsidianIpcSetMenuParams.d.ts';
import type { ObsidianIpcVaultEntry } from './ObsidianIpcVaultEntry.d.ts';

/**
 * Electron IPC renderer for communicating with the main process.
 *
 * The overloads naming a channel of Obsidian's main process were read from the `main.js` of Obsidian 1.14.4, which is
 * the same file on the public and catalyst channels. Each channel is typed on the method the handler answers:
 * `sendSync` for a handler that sets `event.returnValue`, `send` for one that does not, and `invoke` for one
 * registered with `ipcMain.handle`.
 *
 * @public
 * @unofficial
 */
export interface ElectronIpcRenderer extends NodeJS.EventEmitter {
  /**
   * Adds Obsidian's command line tool to the `PATH`: the user `Path` variable on Windows, a `/usr/local/bin/obsidian`
   * link or a `~/.zprofile` line on macOS.
   *
   * @param channel - The `register-cli` channel of Obsidian's main process.
   * @returns A promise resolving with the outcome.
   */
  invoke(channel: 'register-cli'): Promise<ObsidianIpcRegisterCliResult>;

  /**
   * Sends a message to the main process via `channel` and expects a result asynchronously.
   *
   * The main process should listen for `channel` with `ipcMain.handle()`. Arguments are serialized
   * with the Structured Clone Algorithm, so prototype chains are not included and sending functions,
   * promises, symbols, weak maps, or weak sets throws an exception.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   * @returns A promise resolving with the response from the main process.
   */
  invoke(channel: string, ...args: unknown[]): Promise<unknown>;

  /**
   * Listens to `channel`; when a new message arrives `listener` is called with `listener(event, args...)`.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This `IpcRenderer` instance.
   */
  on(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this;

  /**
   * Adds a one-time `listener` function for the event, invoked only the next time a message is sent
   * to `channel`, after which it is removed.
   *
   * @param channel - The IPC channel name.
   * @param listener - Callback invoked when a message is received.
   * @returns This `IpcRenderer` instance.
   */
  once(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void): this;

  /**
   * Sends a message to the main process, optionally transferring ownership of zero or more
   * `MessagePort` objects. The transferred ports are available in the main process as
   * `MessagePortMain` objects via the `ports` property of the emitted event.
   *
   * @param channel - The IPC channel name.
   * @param message - The message to send.
   * @param transfer - Optional transferable `MessagePort` objects.
   */
  postMessage(channel: string, message: unknown, transfer?: MessagePort[]): void;

  /**
   * Removes all listeners of the specified `channel`.
   *
   * @param channel - The IPC channel name.
   * @returns This `IpcRenderer` instance.
   */
  removeAllListeners(channel: string): this;

  /**
   * Removes the specified `listener` from the listener array for the specified `channel`.
   *
   * @param channel - The IPC channel name.
   * @param listener - The listener to remove.
   * @returns This `IpcRenderer` instance.
   */
  removeListener(channel: string, listener: (...args: unknown[]) => void): this;

  /**
   * Starts an update check when `shouldCheck` is truthy, enabling the updater for the check if automatic updates are
   * disabled. Use `sendSync` to also read whether a check is in progress.
   *
   * @param channel - The `check-update` channel of Obsidian's main process.
   * @param shouldCheck - Whether to start a check.
   */
  send(channel: 'check-update', shouldCheck?: boolean): void;

  /**
   * Makes the next Electron `context-menu` event of the calling window show the main process's native edit menu,
   * with spelling suggestions.
   *
   * @param channel - The `context-menu` channel of Obsidian's main process.
   */
  send(channel: 'context-menu'): void;

  /**
   * Creates the browser session of a partition, used by the Web viewer and web embeds, unless it exists. A new session
   * drops `Obsidian` and `Electron` from its user agent and allows only the clipboard permissions.
   *
   * @param channel - The `create-browser-session` channel of Obsidian's main process.
   * @param partition - The partition name, as `session.fromPartition` takes it.
   * @param isAdblockEnabled - `true` or `false` to turn ad blocking on or off for the session; anything else keeps it,
   * and a new session starts with it off.
   */
  send(channel: 'create-browser-session', partition: string, isAdblockEnabled?: boolean | null): void;

  /**
   * Sets Obsidian's "Receive early access versions" setting without reading it back.
   *
   * @param channel - The `insider-build` channel of Obsidian's main process.
   * @param isEnabled - `true` or `false` to set the setting. `true` is ignored where an organization policy (the
   * `insider` key) forbids early access.
   */
  send(channel: 'insider-build', isEnabled: boolean): void;

  /**
   * Shows an open-file dialog for the calling vault window and opens the chosen file in that vault.
   *
   * @param channel - The `open-file` channel of Obsidian's main process.
   * @param extensions - The file extensions to offer, without the leading dot.
   */
  send(channel: 'open-file', extensions: string[]): void;

  /**
   * Opens a URL the way a clicked link does: in Obsidian for `http`, `https` and `obsidian` links and local files,
   * otherwise in the system's default application, after a confirmation for an unknown scheme.
   *
   * @param channel - The `open-url` channel of Obsidian's main process.
   * @param url - The URL to open.
   */
  send(channel: 'open-url', url: string): void;

  /**
   * Prints the calling window to a PDF file. The main process sends an empty object back on the `print-to-pdf`
   * channel when it is done, whether or not the file was written.
   *
   * @param channel - The `print-to-pdf` channel of Obsidian's main process.
   * @param options - Electron's PDF options plus the file to write.
   */
  send(channel: 'print-to-pdf', options: ObsidianIpcPrintToPdfOptions): void;

  /**
   * Pops up the application menu of the calling window.
   *
   * @param channel - The `render-menu` channel of Obsidian's main process.
   */
  send(channel: 'render-menu'): void;

  /**
   * Sends an HTTP request from the main process, which bypasses CORS. The main process replies on `replyChannel`
   * with `{ status, headers, body }`, `body` being an `ArrayBuffer`, or with `{ error }`.
   *
   * @param channel - The `request-url` channel of Obsidian's main process.
   * @param replyChannel - The channel to reply on; Obsidian uses a random one per request.
   * @param params - The request.
   */
  send(channel: 'request-url', replyChannel: string, params: ObsidianIpcRequestUrlParams): void;

  /**
   * Sets the application menu of the calling window.
   *
   * @param channel - The `set-menu` channel of Obsidian's main process.
   * @param params - The menu.
   */
  send(channel: 'set-menu', params: ObsidianIpcSetMenuParams): void;

  /**
   * Changes items of the calling window's application menu.
   *
   * @param channel - The `update-menu-items` channel of Obsidian's main process.
   * @param updates - The changes.
   * @param shouldRebuild - Whether to rebuild the macOS application menu afterwards.
   */
  send(channel: 'update-menu-items', updates: ObsidianIpcMenuItemStateUpdate[], shouldRebuild?: boolean): void;

  /**
   * Sends an asynchronous message to the main process via `channel`, along with arguments.
   *
   * The main process handles it by listening for `channel` with the `ipcMain` module. Arguments are
   * serialized with the Structured Clone Algorithm, so prototype chains are not included and sending
   * functions, promises, symbols, weak maps, or weak sets throws an exception.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  send(channel: string, ...args: unknown[]): void;

  /**
   * Reads or sets how often the ad block lists are downloaded again.
   *
   * @param channel - The `adblock-frequency` channel of Obsidian's main process.
   * @param days - A number to set the interval in days, `0` meaning never; anything else only reads it. Setting it
   * reloads the lists.
   * @returns The interval in days, `4` when unset. A stored `0` also reads back as `4`, because the main process falls
   * back with `||`.
   */
  sendSync(channel: 'adblock-frequency', days?: null | number): number;

  /**
   * Reads or sets the URLs of the ad block lists.
   *
   * @param channel - The `adblock-lists` channel of Obsidian's main process.
   * @param urls - An array to set the lists; anything else only reads them. Setting them reloads the lists.
   * @returns The list URLs, EasyList and EasyPrivacy when unset.
   */
  sendSync(channel: 'adblock-lists', urls?: null | string[]): string[];

  /**
   * Starts an update check when `shouldCheck` is truthy, enabling the updater for the check if automatic updates are
   * disabled.
   *
   * @param channel - The `check-update` channel of Obsidian's main process.
   * @param shouldCheck - Whether to start a check.
   * @returns Whether an update check is in progress.
   */
  sendSync(channel: 'check-update', shouldCheck?: boolean): boolean;

  /**
   * Reads or sets Obsidian's "Command line interface" setting.
   *
   * @param channel - The `cli` channel of Obsidian's main process.
   * @param isEnabled - `true` or `false` to set the setting; anything else only reads it.
   * @returns Whether the setting is on, after applying `isEnabled`.
   */
  sendSync(channel: 'cli', isEnabled?: boolean | null): boolean;

  /**
   * Copies a downloaded `obsidian-<version>.asar` file into Obsidian's user data folder, where the next launch loads it.
   *
   * @param channel - The `copy-asar` channel of Obsidian's main process.
   * @param filePath - The path of the file, whose name must start with `obsidian-<major>.<minor>.<patch>`.
   * @returns Whether the file was copied.
   */
  sendSync(channel: 'copy-asar', filePath: string): boolean;

  /**
   * Gets the user's desktop folder.
   *
   * @param channel - The `desktop-dir` channel of Obsidian's main process.
   * @returns The folder's path, falling back to `~/Desktop` and then to Obsidian's user data folder.
   */
  sendSync(channel: 'desktop-dir'): string;

  /**
   * Reads or sets Obsidian's "Hardware acceleration" setting, stored as its inverse.
   *
   * @param channel - The `disable-gpu` channel of Obsidian's main process.
   * @param isDisabled - `true` or `false` to set the setting; anything else only reads it.
   * @returns `true` when hardware acceleration is disabled, `undefined` when it is not. Never `false`, because
   * Obsidian deletes the stored flag rather than storing `false`.
   */
  sendSync(channel: 'disable-gpu', isDisabled?: boolean | null): true | undefined;

  /**
   * Reads or sets Obsidian's "Automatic updates" setting, stored as its inverse.
   *
   * @param channel - The `disable-update` channel of Obsidian's main process.
   * @param isDisabled - `true` or `false` to set the setting; anything else only reads it.
   * @returns `true` when automatic updates are disabled, `undefined` when they are not. Never `false`, because
   * Obsidian deletes the stored flag rather than storing `false`.
   */
  sendSync(channel: 'disable-update', isDisabled?: boolean | null): true | undefined;

  /**
   * Gets the user's documents folder; the same value as `get-documents-path`.
   *
   * @param channel - The `documents-dir` channel of Obsidian's main process.
   * @returns The folder's path, falling back to `~/Documents` and then to Obsidian's user data folder.
   */
  sendSync(channel: 'documents-dir'): string;

  /**
   * Gets the URL prefix under which Obsidian serves local files to its windows.
   *
   * @param channel - The `file-url` channel of Obsidian's main process.
   * @returns `app://` followed by 36 random hexadecimal digits chosen at launch, and `/`.
   */
  sendSync(channel: 'file-url'): string;

  /**
   * Reads or sets Obsidian's "Window frame style" setting, which takes effect after a relaunch.
   *
   * @param channel - The `frame` channel of Obsidian's main process.
   * @param style - A string to set the setting, `''` clearing it; anything else only reads it.
   * @returns The stored style, `undefined` when unset, which Obsidian treats as `hidden`.
   */
  sendSync(
    channel: 'frame',
    style?: '' | 'custom' | 'hidden' | 'native' | null
  ): 'custom' | 'hidden' | 'native' | undefined;

  /**
   * Gets the folder Obsidian suggests for a new vault.
   *
   * @param channel - The `get-default-vault-path` channel of Obsidian's main process.
   * @returns The `Obsidian Vault` folder inside the user's documents folder.
   */
  sendSync(channel: 'get-default-vault-path'): string;

  /**
   * Gets the user's documents folder; the same value as `documents-dir`.
   *
   * @param channel - The `get-documents-path` channel of Obsidian's main process.
   * @returns The folder's path, falling back to `~/Documents` and then to Obsidian's user data folder.
   */
  sendSync(channel: 'get-documents-path'): string;

  /**
   * Gets the file name of the custom app icon.
   *
   * @param channel - The `get-icon` channel of Obsidian's main process.
   * @returns The file name inside Obsidian's user data folder, `undefined` when no custom icon is set.
   */
  sendSync(channel: 'get-icon'): string | undefined;

  /**
   * Gets the folder of the sandbox vault.
   *
   * @param channel - The `get-sandbox-vault-path` channel of Obsidian's main process.
   * @returns The `Obsidian Sandbox` folder inside Obsidian's user data folder.
   */
  sendSync(channel: 'get-sandbox-vault-path'): string;

  /**
   * Opens the help vault.
   *
   * @param channel - The `help` channel of Obsidian's main process.
   * @returns `null`.
   */
  sendSync(channel: 'help'): null;

  /**
   * Reads or sets Obsidian's "Receive early access versions" setting.
   *
   * @param channel - The `insider-build` channel of Obsidian's main process.
   * @param isEnabled - `true` or `false` to set the setting; anything else only reads it. `true` is ignored
   * where an organization policy (the `insider` key) forbids early access.
   * @returns Whether early access versions are received, after applying `isEnabled`.
   */
  sendSync(channel: 'insider-build', isEnabled?: boolean | null): boolean;

  /**
   * Checks whether the calling window is closing.
   *
   * @param channel - The `is-closing` channel of Obsidian's main process.
   * @returns `true` when the app is quitting or the calling window is closing.
   */
  sendSync(channel: 'is-closing'): boolean;

  /**
   * Checks whether the app is quitting.
   *
   * @param channel - The `is-quitting` channel of Obsidian's main process.
   * @returns Whether the app is quitting.
   */
  sendSync(channel: 'is-quitting'): boolean;

  /**
   * Gets the latest public version of Obsidian, as the updater last reported it.
   *
   * @param channel - The `latest-public-version` channel of Obsidian's main process.
   * @returns The version, `''` until the updater has reported one.
   */
  sendSync(channel: 'latest-public-version'): string;

  /**
   * Gets the organization policy, which restricts the features of an `obsidian-work` install.
   *
   * @param channel - The `policy` channel of Obsidian's main process.
   * @returns The policy, allowing everything outside an `obsidian-work` install.
   */
  sendSync(channel: 'policy'): ObsidianIpcPolicy;

  /**
   * Relaunches the app.
   *
   * @param channel - The `relaunch` channel of Obsidian's main process.
   * @returns `''`, before the app quits.
   */
  sendSync(channel: 'relaunch'): '';

  /**
   * Gets the folder of the loaded Obsidian app package.
   *
   * @param channel - The `resources` channel of Obsidian's main process.
   * @returns The path of the loaded `.asar`, which holds the app's `package.json`.
   */
  sendSync(channel: 'resources'): string;

  /**
   * Opens the sandbox vault, recreating it from the bundled copy unless its window is already open.
   *
   * @param channel - The `sandbox` channel of Obsidian's main process.
   * @returns `null`.
   */
  sendSync(channel: 'sandbox'): null;

  /**
   * Sets or clears the custom app icon. The previous icon file is deleted.
   *
   * @param channel - The `set-icon` channel of Obsidian's main process.
   * @param fileName - The file name to store the icon under in Obsidian's user data folder.
   * @param data - The icon file's contents.
   * @returns `null`. The icon is cleared unless both `fileName` and `data` are given.
   */
  sendSync(channel: 'set-icon', fileName: null | string, data: null | string | Uint8Array): null;

  /**
   * Sets the language of the app.
   *
   * @param channel - The `set-language` channel of Obsidian's main process.
   * @param language - The language code; an empty value or `null` returns to the default.
   * @returns `null`.
   */
  sendSync(channel: 'set-language', language: null | string): null;

  /**
   * Opens the vault picker.
   *
   * @param channel - The `starter` channel of Obsidian's main process.
   * @returns `null`.
   */
  sendSync(channel: 'starter'): null;

  /**
   * Gets the text of the distribution terms Obsidian asks the user to accept.
   *
   * @param channel - The `terms` channel of Obsidian's main process.
   * @returns The terms.
   */
  sendSync(channel: 'terms'): string;

  /**
   * Moves a file or folder to the system trash.
   *
   * @param channel - The `trash` channel of Obsidian's main process.
   * @param path - The path to move.
   * @returns Whether it was moved.
   */
  sendSync(channel: 'trash', path: string): boolean;

  /**
   * Gets the state of the updater.
   *
   * @param channel - The `update` channel of Obsidian's main process.
   * @returns `'update-downloaded'` when an update is ready to install, `'update-manual-required'` when the user has
   * to install one by hand, `''` otherwise.
   */
  sendSync(channel: 'update'): '' | 'update-downloaded' | 'update-manual-required';

  /**
   * Gets the vault of the calling window.
   *
   * @param channel - The `vault` channel of Obsidian's main process.
   * @returns The vault's id and absolute path, an empty object when the window belongs to no vault.
   */
  sendSync(channel: 'vault'): ObsidianIpcCurrentVault;

  /**
   * Gets the vault registry.
   *
   * @param channel - The `vault-list` channel of Obsidian's main process.
   * @returns The registered vaults, keyed by vault id.
   */
  sendSync(channel: 'vault-list'): Record<string, ObsidianIpcVaultEntry>;

  /**
   * Hands a message to a vault's window, opening the window if it is not open but not focusing an open one. The
   * window's `OBS_ACT` handler receives the message, so the message must be one it understands, such as
   * `{ action: 'open', file }`.
   *
   * @param channel - The `vault-message` channel of Obsidian's main process.
   * @param vaultPath - The path of the vault folder. Nothing is sent when no registered vault has that path.
   * @param message - The message, serialized as JSON.
   * @returns `''`.
   */
  sendSync(channel: 'vault-message', vaultPath: string, message: unknown): '';

  /**
   * Moves a registered vault's folder and updates its registry entry.
   *
   * @param channel - The `vault-move` channel of Obsidian's main process.
   * @param oldPath - The vault's current path, exactly as the registry holds it.
   * @param newPath - The path to move the folder to.
   * @returns `''` when the vault was moved, `'EVAULTOPEN'` when its window is open, the error's text when the move
   * failed, or `false` when no registered vault has `oldPath`.
   */
  sendSync(channel: 'vault-move', oldPath: string, newPath: string): false | string;

  /**
   * Opens a vault in its own window, registering the folder as a vault if it is not one yet.
   *
   * @param channel - The `vault-open` channel of Obsidian's main process.
   * @param vaultPath - The path of the vault folder, resolved to an absolute path.
   * @param shouldCreate - Whether to create the folder first. Creating fails with `'Vault already exists'` when the
   * path exists.
   * @returns `true` when the vault was opened, otherwise the reason it was not: `'Vault already exists'`, the folder
   * creation error's text, `'folder not found'`, or `'no permission to access folder'`.
   */
  sendSync(channel: 'vault-open', vaultPath: string, shouldCreate?: boolean): string | true;

  /**
   * Removes a vault from the registry, with its saved window state and its browser storage partition. The vault
   * folder itself is not touched.
   *
   * @param channel - The `vault-remove` channel of Obsidian's main process.
   * @param vaultPath - The vault's path, exactly as the registry holds it: absolute and resolved, since no resolving
   * happens here.
   * @returns `true` when the vault was removed, `false` when its window is open or no registered vault has that path.
   */
  sendSync(channel: 'vault-remove', vaultPath: string): boolean;

  /**
   * Gets the version of the loaded Obsidian app package.
   *
   * @param channel - The `version` channel of Obsidian's main process.
   * @returns The `version` of the loaded app's `package.json`, or Electron's `app.getVersion()` when it cannot be read.
   */
  sendSync(channel: 'version'): string;

  /**
   * Sends a message to the main process via `channel` and expects a result synchronously.
   *
   * The main process handles it by listening for `channel` with the `ipcMain` module and replies by
   * setting `event.returnValue`. Sending a synchronous message blocks the whole renderer process
   * until the reply is received, so use this only as a last resort.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   * @returns The value sent back by the `ipcMain` handler.
   */
  sendSync(channel: string, ...args: unknown[]): unknown;

  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   *
   * @param webContentsId - The `webContents.id` of the target window.
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  sendTo(webContentsId: number, channel: string, ...args: unknown[]): void;

  /**
   * Like `send`, but the event is sent to the `<webview>` element in the host page instead of the
   * main process.
   *
   * @param channel - The IPC channel name.
   * @param args - Arguments to send.
   */
  sendToHost(channel: string, ...args: unknown[]): void;
}
