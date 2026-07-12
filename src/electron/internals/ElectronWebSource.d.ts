/**
 * A script source to evaluate in an isolated world.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebSource {
  /** The JavaScript code to evaluate. */
  code: string;

  /** The URL associated with the code. */
  url?: string;
}
