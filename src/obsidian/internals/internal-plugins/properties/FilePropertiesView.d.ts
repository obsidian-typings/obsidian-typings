import type {
  TFile,
  WorkspaceLeaf
} from 'obsidian';
import type { ViewType } from '../../../implementations/constants/ViewType.d.ts';
import type { InfoFileView } from '../../views/InfoFileView.d.ts';
import type { PropertiesPluginInstance } from './PropertiesPluginInstance.d.ts';

/**
 * View that displays frontmatter properties for the current file.
 * @public
 * @unofficial
 */
export interface FilePropertiesView extends InfoFileView {
  /**
   * Constructor.
   *
   * @param leaf - The workspace leaf.
   * @param propertiesPluginInstance - The properties plugin instance.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor3__(leaf: WorkspaceLeaf, propertiesPluginInstance: PropertiesPluginInstance): this;

  /**
   * Returns the file.
   *
   * @returns The current file.
   */
  getFile(): TFile;

  /**
   * Get the current view type.
   *
   * @returns The file properties view type.
   */
  getViewType(): typeof ViewType.FileProperties;

  /**
   * Checks the file is an markdown file.
   *
   * @param file - The file to check.
   * @returns Whether the file is a supported markdown file.
   */
  isSupportedFile(file: TFile): boolean;

  /**
   * Handle a file content change and refresh properties.
   *
   * @param file - The changed file.
   * @returns Resolves when the properties are refreshed.
   */
  onFileChange(file: TFile): Promise<unknown>;

  /**
   * Handle a quick preview update for the file.
   *
   * @param file - The file being previewed.
   * @param t - The preview data.
   */
  onQuickPreview(file: TFile, t: unknown): void;

  /**
   * Reads the file if it is supported.
   *
   * @param file - The file to read.
   * @returns A promise that resolves with the file contents.
   */
  readSupportedFile(file: TFile): Promise<unknown>;

  /**
   * Save the modified frontmatter data to the file.
   *
   * @param e - The frontmatter data to save.
   */
  saveFrontmatter(e: unknown): void;

  /** Move focus to the next property field. */
  shiftFocusAfter(): void;

  /** Move focus to the previous property field. */
  shiftFocusBefore(): void;

  /** Refresh the file properties view. */
  update(): void;

  /** Update the empty state display when no properties exist. */
  updateEmptyState(): void;

  /**
   * Update the frontmatter of a file with new property data.
   *
   * @param file - The file to update.
   * @param t - The new property data.
   * @returns The update result.
   */
  updateFrontmatter(file: TFile, t: unknown): unknown;
}
