/**
 * How visual mode is selecting: by whole lines, by rectangular block, or by character range, which is
 * reported as the empty string.
 *
 * @public
 * @unofficial
 */
export type VimSubMode = '' | 'blockwise' | 'linewise';
