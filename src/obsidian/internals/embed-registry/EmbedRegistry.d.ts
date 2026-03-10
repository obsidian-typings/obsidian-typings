import type {
  Events,
  TFile
} from 'obsidian';

import type {
  getEmbedRegistryConstructor
} from '../../implementations/constructors/internals/getEmbedRegistryConstructor.d.ts';
import type { EmbedCreator } from './EmbedCreator.d.ts';
import type { EmbedRegistryEmbedByExtensionRecord } from './EmbedRegistryEmbedByExtensionRecord.d.ts';

/**
 * A registry for embeddable files components.
 *
 * @public
 * @unofficial
 */
export interface EmbedRegistry extends Events {
  /**
   * Mapping of file extensions to constructors for embeddable widgets.
   */
  embedByExtension: EmbedRegistryEmbedByExtensionRecord;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getEmbedRegistryConstructor} from `obsidian-typings/implementations`.
   *
   * @deprecated - Added only for typing purposes.
   */
  constructor__(): this;

  /**
   * Get the embed constructor for a specific file type.
   *
   * @param file - File to get the embed creator for.
   * @returns The embed creator, or `null` if none registered.
   */
  getEmbedCreator(file: TFile): EmbedCreator | null;

  /**
   * Check whether a file extension has a registered embed constructor.
   *
   * @param extension - File extension to check.
   * @returns Whether the extension is registered.
   */
  isExtensionRegistered(extension: string): boolean;

  /**
   * Register an embed constructor for a specific file extension.
   *
   * @param extension - File extension to register.
   * @param embedCreator - Embed creator function.
   */
  registerExtension(extension: string, embedCreator: EmbedCreator): void;

  /**
   * Register an embed constructor for a list of file extensions.
   *
   * @param extensions - File extensions to register.
   * @param embedCreator - Embed creator function.
   */
  registerExtensions(extensions: string[], embedCreator: EmbedCreator): void;

  /**
   * Unregister an embed constructor for a specific file extension.
   *
   * @param extension - File extension to unregister.
   */
  unregisterExtension(extension: string): void;

  /**
   * Unregister an embed constructor for a list of file extensions.
   *
   * @param extensions - File extensions to unregister.
   */
  unregisterExtensions(extensions: string[]): void;
}
