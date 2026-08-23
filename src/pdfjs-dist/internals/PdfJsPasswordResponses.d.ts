/**
 * The reasons a document can ask for a password, as passed to the `onPassword` callback.
 *
 * @public
 * @unofficial
 */
export interface PdfJsPasswordResponses {
  /** The password that was supplied is wrong. */
  INCORRECT_PASSWORD: number;

  /** The document is encrypted and no password was supplied yet. */
  NEED_PASSWORD: number;
}
