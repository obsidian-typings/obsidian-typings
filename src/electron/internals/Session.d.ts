import type { ElectronBluetoothPairingHandlerHandlerDetails } from './ElectronBluetoothPairingHandlerHandlerDetails.d.ts';
import type { ElectronBluetoothPairingResponse } from './ElectronBluetoothPairingResponse.d.ts';
import type { ElectronClearCodeCachesOptions } from './ElectronClearCodeCachesOptions.d.ts';
import type { ElectronClearStorageDataOptions } from './ElectronClearStorageDataOptions.d.ts';
import type { ElectronConfig } from './ElectronConfig.d.ts';
import type { ElectronCookies } from './ElectronCookies.d.ts';
import type { ElectronCreateInterruptedDownloadOptions } from './ElectronCreateInterruptedDownloadOptions.d.ts';
import type { ElectronDevicePermissionHandlerHandlerDetails } from './ElectronDevicePermissionHandlerHandlerDetails.d.ts';
import type { ElectronDownloadItem } from './ElectronDownloadItem.d.ts';
import type { ElectronEnableNetworkEmulationOptions } from './ElectronEnableNetworkEmulationOptions.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronExtension } from './ElectronExtension.d.ts';
import type { ElectronFromPartitionOptions } from './ElectronFromPartitionOptions.d.ts';
import type { ElectronHidDeviceAddedDetails } from './ElectronHidDeviceAddedDetails.d.ts';
import type { ElectronHidDeviceRemovedDetails } from './ElectronHidDeviceRemovedDetails.d.ts';
import type { ElectronLoadExtensionOptions } from './ElectronLoadExtensionOptions.d.ts';
import type { ElectronNetLog } from './ElectronNetLog.d.ts';
import type { ElectronPermissionCheckHandlerHandlerDetails } from './ElectronPermissionCheckHandlerHandlerDetails.d.ts';
import type { ElectronPermissionRequestHandlerHandlerDetails } from './ElectronPermissionRequestHandlerHandlerDetails.d.ts';
import type { ElectronPreconnectOptions } from './ElectronPreconnectOptions.d.ts';
import type { ElectronProtocol } from './ElectronProtocol.d.ts';
import type { ElectronRequest } from './ElectronRequest.d.ts';
import type { ElectronSelectHidDeviceDetails } from './ElectronSelectHidDeviceDetails.d.ts';
import type { ElectronSerialPort } from './ElectronSerialPort.d.ts';
import type { ElectronServiceWorkers } from './ElectronServiceWorkers.d.ts';
import type { ElectronSSLConfigConfig } from './ElectronSSLConfigConfig.d.ts';
import type { ElectronWebContents } from './ElectronWebContents.d.ts';
import type { ElectronWebRequest } from './ElectronWebRequest.d.ts';

/**
 * Electron session for managing browser sessions, cookies, cache, network, and extensions.
 *
 * Note: The upstream `static fromPartition(...)` and `static defaultSession` members cannot be
 * expressed as statics on a plain interface, so they are modelled here as instance members.
 *
 * @public
 * @unofficial
 */
export interface Session {
  /** A list of all the known available spell checker languages. */
  readonly availableSpellCheckerLanguages: string[];

  /** A `Cookies` object for this session. */
  readonly cookies: ElectronCookies;

  /** The default session object of the app. */
  defaultSession: Session;

  /** A `NetLog` object for this session. */
  readonly netLog: ElectronNetLog;

  /** A `Protocol` object for this session. */
  readonly protocol: ElectronProtocol;

  /** A `ServiceWorkers` object for this session. */
  readonly serviceWorkers: ElectronServiceWorkers;

  /** Whether the builtin spell checker is enabled. */
  spellCheckerEnabled: boolean;

  /** The absolute file system path where data for this session is persisted on disk, or `null` for in-memory sessions. */
  readonly storagePath: null | string;

  /** A `WebRequest` object for this session. */
  readonly webRequest: ElectronWebRequest;

  /** Emitted after an extension is loaded. */
  addListener(event: 'extension-loaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted after an extension is loaded and all necessary browser state is initialized. */
  addListener(event: 'extension-ready', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted after an extension is unloaded. */
  addListener(event: 'extension-unloaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted when a new HID device becomes available. */
  addListener(event: 'hid-device-added', listener: (event: ElectronEvent, details: ElectronHidDeviceAddedDetails) => void): this;
  /** Emitted when a HID device has been removed. */
  addListener(event: 'hid-device-removed', listener: (event: ElectronEvent, details: ElectronHidDeviceRemovedDetails) => void): this;
  /** Emitted when a render process requests preconnection to a URL. */
  addListener(event: 'preconnect', listener: (event: ElectronEvent, preconnectUrl: string, allowCredentials: boolean) => void): this;
  /** Emitted when a HID device needs to be selected. */
  addListener(event: 'select-hid-device', listener: (event: ElectronEvent, details: ElectronSelectHidDeviceDetails, callback: (deviceId?: null | string) => void) => void): this;
  /** Emitted when a serial port needs to be selected. */
  addListener(event: 'select-serial-port', listener: (event: ElectronEvent, portList: ElectronSerialPort[], webContents: ElectronWebContents, callback: (portId: string) => void) => void): this;
  /** Emitted after a new serial port becomes available. */
  addListener(event: 'serial-port-added', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Emitted after a serial port has been removed. */
  addListener(event: 'serial-port-removed', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Emitted when a hunspell dictionary file starts downloading. */
  addListener(event: 'spellcheck-dictionary-download-begin', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file download fails. */
  addListener(event: 'spellcheck-dictionary-download-failure', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file has been successfully downloaded. */
  addListener(event: 'spellcheck-dictionary-download-success', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file has been successfully initialized. */
  addListener(event: 'spellcheck-dictionary-initialized', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when Electron is about to download `item` in `webContents`. */
  addListener(event: 'will-download', listener: (event: ElectronEvent, item: ElectronDownloadItem, webContents: ElectronWebContents) => void): this;

  /**
   * Writes the word to the custom dictionary. Does not work on non-persistent (in-memory) sessions.
   *
   * @param word - The word to add.
   * @returns Whether the word was successfully written to the custom dictionary.
   */
  addWordToSpellCheckerDictionary(word: string): boolean;

  /**
   * Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.
   *
   * @param domains - A comma-separated list of servers for which integrated authentication is enabled.
   */
  allowNTLMCredentialsForDomains(domains: string): void;

  /**
   * Clears the session's HTTP authentication cache.
   *
   * @returns A promise that resolves when the HTTP authentication cache has been cleared.
   */
  clearAuthCache(): Promise<void>;

  /**
   * Clears the session's HTTP cache.
   *
   * @returns A promise that resolves when the cache clear operation is complete.
   */
  clearCache(): Promise<void>;

  /**
   * Clears the session's generated JS code caches.
   *
   * @param options - Options controlling which code caches are cleared.
   * @returns A promise that resolves when the code cache clear operation is complete.
   */
  clearCodeCaches(options: ElectronClearCodeCachesOptions): Promise<void>;

  /**
   * Clears the host resolver cache.
   *
   * @returns A promise that resolves when the operation is complete.
   */
  clearHostResolverCache(): Promise<void>;

  /**
   * Clears the storage data for the current session.
   *
   * @param options - Options controlling which storage data is cleared.
   * @returns A promise that resolves when the storage data has been cleared.
   */
  clearStorageData(options?: ElectronClearStorageDataOptions): Promise<void>;

  /**
   * Closes all connections, terminating any requests currently in flight.
   *
   * @returns A promise that resolves when all connections are closed.
   */
  closeAllConnections(): Promise<void>;

  /**
   * Allows resuming a cancelled or interrupted download from a previous session.
   *
   * @param options - Options describing the interrupted download to resume.
   */
  createInterruptedDownload(options: ElectronCreateInterruptedDownloadOptions): void;

  /** Disables any network emulation already active for the session. */
  disableNetworkEmulation(): void;

  /**
   * Initiates a download of the resource at `url`.
   *
   * @param url - The URL of the resource to download.
   */
  downloadURL(url: string): void;

  /**
   * Emulates network with the given configuration for the session.
   *
   * @param options - The network emulation configuration.
   */
  enableNetworkEmulation(options: ElectronEnableNetworkEmulationOptions): void;

  /** Writes any unwritten DOMStorage data to disk. */
  flushStorageData(): void;

  /**
   * Resets all internal states of the proxy service and reapplies the latest proxy configuration.
   *
   * @returns A promise that resolves when the proxy configuration is reapplied.
   */
  forceReloadProxyConfig(): Promise<void>;

  /**
   * Returns a session instance from the `partition` string, creating one with `options` if none exists.
   *
   * @param partition - The partition string.
   * @param options - Options used when creating a new session.
   * @returns The session for the given partition.
   */
  fromPartition(partition: string, options?: ElectronFromPartitionOptions): Session;

  /**
   * Returns a list of all loaded extensions.
   *
   * @returns The loaded extensions.
   */
  getAllExtensions(): ElectronExtension[];

  /**
   * Returns the blob data associated with the given identifier.
   *
   * @param identifier - The blob UUID.
   * @returns A promise that resolves with the blob data.
   */
  getBlobData(identifier: string): Promise<Buffer>;

  /**
   * Returns the session's current cache size, in bytes.
   *
   * @returns A promise that resolves with the cache size in bytes.
   */
  getCacheSize(): Promise<number>;

  /**
   * Returns the loaded extension with the given ID.
   *
   * @param extensionId - The extension ID.
   * @returns The loaded extension.
   */
  getExtension(extensionId: string): ElectronExtension;

  /**
   * Returns an array of paths to preload scripts that have been registered.
   *
   * @returns The registered preload script paths.
   */
  getPreloads(): string[];

  /**
   * Returns an array of language codes the spellchecker is enabled for.
   *
   * @returns The enabled spell checker language codes.
   */
  getSpellCheckerLanguages(): string[];

  /** Returns the absolute file system path where data for this session is persisted on disk. */
  getStoragePath(): void;

  /**
   * Returns the user agent for this session.
   *
   * @returns The user agent.
   */
  getUserAgent(): string;

  /**
   * Returns whether or not this session is a persistent one.
   *
   * @returns Whether the session is persistent.
   */
  isPersistent(): boolean;

  /**
   * Returns whether the builtin spell checker is enabled.
   *
   * @returns Whether the spell checker is enabled.
   */
  isSpellCheckerEnabled(): boolean;

  /**
   * Returns all words in the app's custom dictionary.
   *
   * @returns A promise that resolves with all words in the custom dictionary.
   */
  listWordsInSpellCheckerDictionary(): Promise<string[]>;

  /**
   * Loads a Chrome extension from `path`.
   *
   * @param path - The path to the unpacked extension.
   * @param options - Options controlling how the extension is loaded.
   * @returns A promise that resolves with the loaded extension.
   */
  loadExtension(path: string, options?: ElectronLoadExtensionOptions): Promise<ElectronExtension>;

  /** Emitted after an extension is loaded. */
  on(event: 'extension-loaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted after an extension is loaded and all necessary browser state is initialized. */
  on(event: 'extension-ready', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted after an extension is unloaded. */
  on(event: 'extension-unloaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted when a new HID device becomes available. */
  on(event: 'hid-device-added', listener: (event: ElectronEvent, details: ElectronHidDeviceAddedDetails) => void): this;
  /** Emitted when a HID device has been removed. */
  on(event: 'hid-device-removed', listener: (event: ElectronEvent, details: ElectronHidDeviceRemovedDetails) => void): this;
  /** Emitted when a render process requests preconnection to a URL. */
  on(event: 'preconnect', listener: (event: ElectronEvent, preconnectUrl: string, allowCredentials: boolean) => void): this;
  /** Emitted when a HID device needs to be selected. */
  on(event: 'select-hid-device', listener: (event: ElectronEvent, details: ElectronSelectHidDeviceDetails, callback: (deviceId?: null | string) => void) => void): this;
  /** Emitted when a serial port needs to be selected. */
  on(event: 'select-serial-port', listener: (event: ElectronEvent, portList: ElectronSerialPort[], webContents: ElectronWebContents, callback: (portId: string) => void) => void): this;
  /** Emitted after a new serial port becomes available. */
  on(event: 'serial-port-added', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Emitted after a serial port has been removed. */
  on(event: 'serial-port-removed', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Emitted when a hunspell dictionary file starts downloading. */
  on(event: 'spellcheck-dictionary-download-begin', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file download fails. */
  on(event: 'spellcheck-dictionary-download-failure', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file has been successfully downloaded. */
  on(event: 'spellcheck-dictionary-download-success', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file has been successfully initialized. */
  on(event: 'spellcheck-dictionary-initialized', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when Electron is about to download `item` in `webContents`. */
  on(event: 'will-download', listener: (event: ElectronEvent, item: ElectronDownloadItem, webContents: ElectronWebContents) => void): this;

  /** Emitted after an extension is loaded. */
  once(event: 'extension-loaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted after an extension is loaded and all necessary browser state is initialized. */
  once(event: 'extension-ready', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted after an extension is unloaded. */
  once(event: 'extension-unloaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Emitted when a new HID device becomes available. */
  once(event: 'hid-device-added', listener: (event: ElectronEvent, details: ElectronHidDeviceAddedDetails) => void): this;
  /** Emitted when a HID device has been removed. */
  once(event: 'hid-device-removed', listener: (event: ElectronEvent, details: ElectronHidDeviceRemovedDetails) => void): this;
  /** Emitted when a render process requests preconnection to a URL. */
  once(event: 'preconnect', listener: (event: ElectronEvent, preconnectUrl: string, allowCredentials: boolean) => void): this;
  /** Emitted when a HID device needs to be selected. */
  once(event: 'select-hid-device', listener: (event: ElectronEvent, details: ElectronSelectHidDeviceDetails, callback: (deviceId?: null | string) => void) => void): this;
  /** Emitted when a serial port needs to be selected. */
  once(event: 'select-serial-port', listener: (event: ElectronEvent, portList: ElectronSerialPort[], webContents: ElectronWebContents, callback: (portId: string) => void) => void): this;
  /** Emitted after a new serial port becomes available. */
  once(event: 'serial-port-added', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Emitted after a serial port has been removed. */
  once(event: 'serial-port-removed', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Emitted when a hunspell dictionary file starts downloading. */
  once(event: 'spellcheck-dictionary-download-begin', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file download fails. */
  once(event: 'spellcheck-dictionary-download-failure', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file has been successfully downloaded. */
  once(event: 'spellcheck-dictionary-download-success', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when a hunspell dictionary file has been successfully initialized. */
  once(event: 'spellcheck-dictionary-initialized', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Emitted when Electron is about to download `item` in `webContents`. */
  once(event: 'will-download', listener: (event: ElectronEvent, item: ElectronDownloadItem, webContents: ElectronWebContents) => void): this;

  /**
   * Preconnects the given number of sockets to an origin.
   *
   * @param options - Options describing the origin and number of sockets.
   */
  preconnect(options: ElectronPreconnectOptions): void;

  /**
   * Unloads an extension.
   *
   * @param extensionId - The extension ID.
   */
  removeExtension(extensionId: string): void;

  /** Removes a previously registered `extension-loaded` event listener. */
  removeListener(event: 'extension-loaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Removes a previously registered `extension-ready` event listener. */
  removeListener(event: 'extension-ready', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Removes a previously registered `extension-unloaded` event listener. */
  removeListener(event: 'extension-unloaded', listener: (event: ElectronEvent, extension: ElectronExtension) => void): this;
  /** Removes a previously registered `hid-device-added` event listener. */
  removeListener(event: 'hid-device-added', listener: (event: ElectronEvent, details: ElectronHidDeviceAddedDetails) => void): this;
  /** Removes a previously registered `hid-device-removed` event listener. */
  removeListener(event: 'hid-device-removed', listener: (event: ElectronEvent, details: ElectronHidDeviceRemovedDetails) => void): this;
  /** Removes a previously registered `preconnect` event listener. */
  removeListener(event: 'preconnect', listener: (event: ElectronEvent, preconnectUrl: string, allowCredentials: boolean) => void): this;
  /** Removes a previously registered `select-hid-device` event listener. */
  removeListener(event: 'select-hid-device', listener: (event: ElectronEvent, details: ElectronSelectHidDeviceDetails, callback: (deviceId?: null | string) => void) => void): this;
  /** Removes a previously registered `select-serial-port` event listener. */
  removeListener(event: 'select-serial-port', listener: (event: ElectronEvent, portList: ElectronSerialPort[], webContents: ElectronWebContents, callback: (portId: string) => void) => void): this;
  /** Removes a previously registered `serial-port-added` event listener. */
  removeListener(event: 'serial-port-added', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Removes a previously registered `serial-port-removed` event listener. */
  removeListener(event: 'serial-port-removed', listener: (event: ElectronEvent, port: ElectronSerialPort, webContents: ElectronWebContents) => void): this;
  /** Removes a previously registered `spellcheck-dictionary-download-begin` event listener. */
  removeListener(event: 'spellcheck-dictionary-download-begin', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Removes a previously registered `spellcheck-dictionary-download-failure` event listener. */
  removeListener(event: 'spellcheck-dictionary-download-failure', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Removes a previously registered `spellcheck-dictionary-download-success` event listener. */
  removeListener(event: 'spellcheck-dictionary-download-success', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Removes a previously registered `spellcheck-dictionary-initialized` event listener. */
  removeListener(event: 'spellcheck-dictionary-initialized', listener: (event: ElectronEvent, languageCode: string) => void): this;
  /** Removes a previously registered `will-download` event listener. */
  removeListener(event: 'will-download', listener: (event: ElectronEvent, item: ElectronDownloadItem, webContents: ElectronWebContents) => void): this;

  /**
   * Removes the word from the custom dictionary. Does not work on non-persistent (in-memory) sessions.
   *
   * @param word - The word to remove.
   * @returns Whether the word was successfully removed from the custom dictionary.
   */
  removeWordFromSpellCheckerDictionary(word: string): boolean;

  /**
   * Resolves the proxy information for `url`.
   *
   * @param url - The URL to resolve the proxy for.
   * @returns A promise that resolves with the proxy information.
   */
  resolveProxy(url: string): Promise<string>;

  /**
   * Sets a handler to respond to Bluetooth pairing requests.
   *
   * @param handler - The pairing handler, or `null` to remove it.
   */
  setBluetoothPairingHandler(handler: ((details: ElectronBluetoothPairingHandlerHandlerDetails, callback: (response: ElectronBluetoothPairingResponse) => void) => void) | null): void;

  /**
   * Sets the certificate verify proc for the session.
   *
   * @param proc - The verification procedure, or `null` to revert to the default.
   */
  setCertificateVerifyProc(proc: ((request: ElectronRequest, callback: (verificationResult: number) => void) => void) | null): void;

  /**
   * Sets the directory to store the generated JS code cache for this session.
   *
   * @param path - The directory to store the code cache in.
   */
  setCodeCachePath(path: string): void;

  /**
   * Sets the handler used to respond to device permission checks for the session.
   *
   * @param handler - The handler returning whether the device is permitted, or `null` to clear it.
   */
  setDevicePermissionHandler(handler: ((details: ElectronDevicePermissionHandlerHandlerDetails) => boolean) | null): void;

  /**
   * Sets the download saving directory.
   *
   * @param path - The directory to save downloads to.
   */
  setDownloadPath(path: string): void;

  /**
   * Sets the handler used to respond to permission checks for the session.
   *
   * @param handler - The handler returning whether the permission is allowed, or `null` to clear it.
   */
  setPermissionCheckHandler(handler: ((webContents: ElectronWebContents | null, permission: string, requestingOrigin: string, details: ElectronPermissionCheckHandlerHandlerDetails) => boolean) | null): void;

  /**
   * Sets the handler used to respond to permission requests for the session.
   *
   * @param handler - The handler invoking the callback to allow or reject the permission, or `null` to clear it.
   */
  setPermissionRequestHandler(handler: ((webContents: ElectronWebContents, permission: 'clipboard-read' | 'display-capture' | 'fullscreen' | 'geolocation' | 'media' | 'mediaKeySystem' | 'midi' | 'midiSysex' | 'notifications' | 'openExternal' | 'pointerLock' | 'unknown', callback: (permissionGranted: boolean) => void, details: ElectronPermissionRequestHandlerHandlerDetails) => void) | null): void;

  /**
   * Adds scripts that will be executed on all web contents associated with this session just before normal preload scripts run.
   *
   * @param preloads - The paths to the preload scripts.
   */
  setPreloads(preloads: string[]): void;

  /**
   * Sets the proxy settings.
   *
   * @param config - The proxy configuration.
   * @returns A promise that resolves when the proxy setting process is complete.
   */
  setProxy(config: ElectronConfig): Promise<void>;

  /**
   * Overrides the URL used to download hunspell dictionaries.
   *
   * @param url - The base URL to download dictionaries from, with a trailing slash.
   */
  setSpellCheckerDictionaryDownloadURL(url: string): void;

  /**
   * Sets whether to enable the builtin spell checker.
   *
   * @param enable - Whether to enable the spell checker.
   */
  setSpellCheckerEnabled(enable: boolean): void;

  /**
   * Sets the languages the spell checker should check.
   *
   * @param languages - An array of language codes.
   */
  setSpellCheckerLanguages(languages: string[]): void;

  /**
   * Sets the SSL configuration for the session.
   *
   * @param config - The SSL configuration.
   */
  setSSLConfig(config: ElectronSSLConfigConfig): void;

  /**
   * Overrides the user agent and accept languages for this session.
   *
   * @param userAgent - The user agent string.
   * @param acceptLanguages - A comma-separated ordered list of language codes.
   */
  setUserAgent(userAgent: string, acceptLanguages?: string): void;
}
