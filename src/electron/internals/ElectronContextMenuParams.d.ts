import type { ElectronEditFlags } from './ElectronEditFlags.d.ts';
import type { ElectronMediaFlags } from './ElectronMediaFlags.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronReferrer } from './ElectronReferrer.d.ts';
import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Parameters describing the context in which a context menu was invoked.
 *
 * @public
 * @unofficial
 */
export interface ElectronContextMenuParams {
  /** Alt text of the selection that the context menu was invoked on. */
  altText: string;

  /** Suggested words to replace the `misspelledWord`. Only available when there is a misspelled word and spellchecker is enabled. */
  dictionarySuggestions: string[];

  /** Flags indicating whether the renderer can perform the corresponding editing action. */
  editFlags: ElectronEditFlags;

  /** Frame from which the context menu was invoked. */
  frame: ElectronWebFrameMain;

  /** The character encoding of the frame on which the menu was invoked. */
  frameCharset: string;

  /** URL of the subframe that the context menu was invoked on. */
  frameURL: string;

  /** Whether the context menu was invoked on an image which has non-empty contents. */
  hasImageContents: boolean;

  /** If the context menu was invoked on an input field, the type of that field. */
  inputFieldType: string;

  /** Whether the context is editable. */
  isEditable: boolean;

  /** Text associated with the link. May be an empty string if the contents of the link are an image. */
  linkText: string;

  /** URL of the link that encloses the node the context menu was invoked on. */
  linkURL: string;

  /** The flags for the media element the context menu was invoked on. */
  mediaFlags: ElectronMediaFlags;

  /** Type of the node the context menu was invoked on. */
  mediaType: 'audio' | 'canvas' | 'file' | 'image' | 'none' | 'plugin' | 'video';

  /** Input source that invoked the context menu. */
  menuSourceType: 'adjustSelection' | 'adjustSelectionReset' | 'keyboard' | 'longPress' | 'longTap' | 'mouse' | 'none' | 'stylus' | 'touch' | 'touchHandle' | 'touchMenu';

  /** The misspelled word under the cursor, if any. */
  misspelledWord: string;

  /** URL of the top level page that the context menu was invoked on. */
  pageURL: string;

  /** The referrer policy of the frame on which the menu is invoked. */
  referrerPolicy: ElectronReferrer;

  /** Rect representing the coordinates in the document space of the selection. */
  selectionRect: ElectronRectangle;

  /** Start position of the selection text. */
  selectionStartOffset: number;

  /** Text of the selection that the context menu was invoked on. */
  selectionText: string;

  /** Whether spellchecking is enabled, if the context is editable. */
  spellcheckEnabled: boolean;

  /** Source URL for the element that the context menu was invoked on. */
  srcURL: string;

  /** Suggested filename to be used when saving the file through the 'Save Link As' context menu option. */
  suggestedFilename: string;

  /** Title text of the selection that the context menu was invoked on. */
  titleText: string;

  /** The x coordinate. */
  x: number;

  /** The y coordinate. */
  y: number;
}
