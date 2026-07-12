/**
 * Security origin, content security policy and name of an isolated world.
 *
 * @public
 * @unofficial
 */
export interface ElectronInfo {
  /** Content Security Policy for the isolated world. */
  csp?: string;

  /** Name for isolated world. Useful in devtools. */
  name?: string;

  /** Security origin for the isolated world. */
  securityOrigin?: string;
}
