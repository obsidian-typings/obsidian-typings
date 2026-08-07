import type { Cm5StringStream } from '../../../codemirror/internals/Cm5StringStream.d.ts';
import type { AddOverlayOptions } from '../AddOverlayOptions.d.ts';

/**
 * The overlay that highlights the matches of the current search query.
 *
 * @public
 * @unofficial
 */
export interface VimSearchOverlay extends AddOverlayOptions {
  /**
   * Advance the stream past the next chunk of text and name the style it should be drawn in.
   *
   * @param stream - The stream positioned at the text being styled.
   * @returns The style name for the consumed text, or `undefined` when it is left unstyled.
   */
  token(stream: Cm5StringStream): string | undefined;
}
