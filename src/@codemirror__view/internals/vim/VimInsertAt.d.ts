/**
 * Where insert mode places the cursor when an action enters it.
 *
 * @public
 * @unofficial
 */
export type VimInsertAt =
  | 'bol'
  | 'charAfter'
  | 'endOfSelectedArea'
  | 'eol'
  | 'firstNonBlank'
  | 'inplace'
  | 'lastEdit'
  | 'startOfSelectedArea';
