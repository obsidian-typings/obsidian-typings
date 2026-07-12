import type { ElectronInfo } from './ElectronInfo.d.ts';
import type { ElectronInsertCSSOptions } from './ElectronInsertCSSOptions.d.ts';
import type { ElectronProvider } from './ElectronProvider.d.ts';
import type { ElectronResourceUsage } from './ElectronResourceUsage.d.ts';
import type { ElectronWebSource } from './ElectronWebSource.d.ts';

/**
 * Electron WebFrame for customizing the rendering of the current web page in the renderer process.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebFrame {
  /** The first child frame of `webFrame`, or `null` if `webFrame` has no children or if the first child is not in the current renderer process. */
  readonly firstChild: ElectronWebFrame | null;

  /** The next sibling frame, or `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process. */
  readonly nextSibling: ElectronWebFrame | null;

  /** The frame which opened `webFrame`, or `null` if there is no opener or the opener is not in the current renderer process. */
  readonly opener: ElectronWebFrame | null;

  /** The parent frame of `webFrame`, or `null` if `webFrame` is top or the parent is not in the current renderer process. */
  readonly parent: ElectronWebFrame | null;

  /** The unique frame id in the current renderer process. Distinct `WebFrame` instances that refer to the same underlying frame will have the same `routingId`. */
  readonly routingId: number;

  /** The top frame in the frame hierarchy to which `webFrame` belongs, or `null` if the top frame is not in the current renderer process. */
  readonly top: ElectronWebFrame | null;

  /**
   * Attempts to free memory that is no longer being used (like images from a previous navigation).
   */
  clearCache(): void;

  /**
   * Evaluates `code` in the page. In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.
   *
   * @param code - The code to evaluate.
   * @param userGesture - Whether to treat the evaluation as being triggered by a user gesture.
   * @param callback - Called with the result of the executed code. Modeled with `unknown` (the upstream `result` type is `any`).
   * @returns A promise that resolves with the result of the executed code, or is rejected if execution throws or results in a rejected promise. Modeled with `unknown` (the upstream type is `any`).
   */
  executeJavaScript(code: string, userGesture?: boolean, callback?: (result: unknown, error: Error) => void): Promise<unknown>;

  /**
   * Works like `executeJavaScript` but evaluates `scripts` in an isolated context. When the execution of a script fails, the returned promise will not reject and the `result` would be `undefined`.
   *
   * @param worldId - The id of the isolated world to run the scripts in.
   * @param scripts - The scripts to evaluate.
   * @param userGesture - Whether to treat the evaluation as being triggered by a user gesture.
   * @param callback - Called with the result of the executed code. Modeled with `unknown` (the upstream `result` type is `any`).
   * @returns A promise that resolves with the result of the executed code, or is rejected if execution could not start. Modeled with `unknown` (the upstream type is `any`).
   */
  executeJavaScriptInIsolatedWorld(worldId: number, scripts: ElectronWebSource[], userGesture?: boolean, callback?: (result: unknown, error: Error) => void): Promise<unknown>;

  /**
   * Returns a child of `webFrame` with the supplied `name`.
   *
   * @param name - The name of the child frame to find.
   * @returns The child frame, or `null` if there is no such frame or if the frame is not in the current renderer process.
   */
  findFrameByName(name: string): ElectronWebFrame;

  /**
   * Returns the frame that has the supplied `routingId`.
   *
   * @param routingId - The routing id of the frame to find.
   * @returns The frame, or `null` if not found.
   */
  findFrameByRoutingId(routingId: number): ElectronWebFrame;

  /**
   * Returns the frame element in `webFrame`'s document selected by `selector`.
   *
   * @param selector - The CSS selector for the frame element.
   * @returns The selected frame, or `null` if `selector` does not select a frame or if the frame is not in the current renderer process.
   */
  getFrameForSelector(selector: string): ElectronWebFrame;

  /**
   * Returns an object describing usage information of Blink's internal memory caches.
   *
   * @returns The resource usage information.
   */
  getResourceUsage(): ElectronResourceUsage;

  /**
   * Returns a list of suggested words for a given word.
   *
   * @param word - The word to get suggestions for.
   * @returns The suggested words. Empty if the word is spelled correctly.
   */
  getWordSuggestions(word: string): string[];

  /**
   * Returns the current zoom factor.
   *
   * @returns The current zoom factor.
   */
  getZoomFactor(): number;

  /**
   * Returns the current zoom level.
   *
   * @returns The current zoom level.
   */
  getZoomLevel(): number;

  /**
   * Injects CSS into the current web page and returns a unique key for the inserted stylesheet.
   *
   * @param css - The CSS to insert.
   * @param options - Options for inserting the CSS.
   * @returns A key for the inserted CSS that can later be used to remove the CSS via `removeInsertedCSS(key)`.
   */
  insertCSS(css: string, options?: ElectronInsertCSSOptions): string;

  /**
   * Inserts `text` into the focused element.
   *
   * @param text - The text to insert.
   */
  insertText(text: string): void;

  /**
   * Returns whether the word is misspelled according to the built in spellchecker. If no dictionary is loaded, always returns `false`.
   *
   * @param word - The word to check.
   * @returns Whether the word is misspelled.
   */
  isWordMisspelled(word: string): boolean;

  /**
   * Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `insertCSS(css)`.
   *
   * @param key - The key of the inserted CSS to remove.
   */
  removeInsertedCSS(key: string): void;

  /**
   * Sets the security origin, content security policy and name of the isolated world. If the `csp` is specified, then the `securityOrigin` also has to be specified.
   *
   * @param worldId - The id of the isolated world to configure.
   * @param info - The isolated world info.
   */
  setIsolatedWorldInfo(worldId: number, info: ElectronInfo): void;

  /**
   * Sets a provider for spell checking in input fields and text areas. If you want to use this method you must disable the builtin spellchecker when you construct the window.
   *
   * @param language - The language to spell check.
   * @param provider - The spell check provider.
   */
  setSpellCheckProvider(language: string, provider: ElectronProvider): void;

  /**
   * Sets the maximum and minimum pinch-to-zoom level. Visual zoom is disabled by default in Electron.
   *
   * @param minimumLevel - The minimum pinch-to-zoom level.
   * @param maximumLevel - The maximum pinch-to-zoom level.
   */
  setVisualZoomLevelLimits(minimumLevel: number, maximumLevel: number): void;

  /**
   * Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = `3.0`. The factor must be greater than `0.0`.
   *
   * @param factor - The zoom factor to set.
   */
  setZoomFactor(factor: number): void;

  /**
   * Changes the zoom level to the specified level. The original size is `0` and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.
   *
   * @param level - The zoom level to set.
   */
  setZoomLevel(level: number): void;
}
