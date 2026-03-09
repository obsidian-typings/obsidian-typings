import type { App } from 'obsidian';
import type {
  getShareReceiverConstructor
} from '../implementations/constructors/internals/getShareReceiverConstructor.d.ts';
import type { SharedFile } from './SharedFile.d.ts';

/**
 * Handler for receiving shared files and text from other apps on mobile.
 * @public
 * @unofficial
 */
export interface ShareReceiver {
  /** Reference to the app. */
  app: App;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getShareReceiverConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App): this;

  /**
   * Handles shared files.
   *
   * @param files - Shared files.
   * @returns A promise that resolves when the shared files are handled.
   */
  handleShareFiles(files: SharedFile[]): Promise<void>;

  /**
   * Handles shared text.
   *
   * @param text - Shared text.
   * @returns A promise that resolves when the shared text is handled.
   */
  handleShareText(text: string): Promise<void>;

  /**
   * Imports shared files.
   *
   * @returns A promise that resolves when the files are imported.
   */
  importFiles(): Promise<void>;

  /**
   * Configures mobile native events to handle file and text sharing.
   */
  setupNative(): void;

  /**
   * Configures the workspace to handle file and text sharing.
   */
  setupWorkspace(): void;
}
