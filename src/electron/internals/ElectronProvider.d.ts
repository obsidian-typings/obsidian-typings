/**
 * A spell check provider for input fields and text areas.
 *
 * @public
 * @unofficial
 */
export interface ElectronProvider {
  /**
   * Runs spell checking asynchronously on an array of individual words and reports the misspelt ones.
   *
   * @param words - The words to spell check.
   * @param callback - Called with the array of misspelt words when spell checking completes.
   */
  spellCheck(words: string[], callback: (misspeltWords: string[]) => void): void;
}
